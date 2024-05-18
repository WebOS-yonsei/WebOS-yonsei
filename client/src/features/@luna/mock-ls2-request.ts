import { join } from 'path';

const adjustPath = (path: string) => {
  let tmp = path;
  if (!/^(luna|palm):\/\//.test(path)) {
    tmp = `luna://${path}`;
  }
  if (tmp.slice(-1) !== '/') {
    tmp = `${tmp}/`;
  }
  return tmp;
};

const splitAt = (index: number) => (p: string) => [p.slice(0, index >= 0 ? index : 0), p.slice(index + 1)];

const parseLS2Uri = (uri: string) => {
  const [, path] = uri.split('//');
  const [service] = path.split('/');
  const pathname = path.slice(path.indexOf('/'));
  const [_category, method] = splitAt(pathname.lastIndexOf('/'))(pathname);
  const category = `${_category}/`;
  return {
    service,
    category,
    method,
  };
};

const getHash = (
  {
    service,
    category,
    method,
  }: {
    service: string;
    category: string;
    method: string;
  },
  params: unknown,
) => {
  const sig = `${service}${category}${method}${JSON.stringify(params)}`;
  let hash = 0;
  if (sig.length === 0) return hash;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < sig.length; ++i) {
    const chr = sig.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// Please add methods not to use hash name.
const methods = ['launch'];

export class MockLS2Request {
  // TODO: can i use generic type here?
  send({
    service,
    method,
    onSuccess,
    onFailure,
    parameters,
    subscribe = false,
  }: {
    service: string;
    method: string;
    onSuccess: (res: unknown) => void;
    onFailure: (res: unknown) => void;
    parameters: {
      subscribe?: boolean;
      [key: string]: unknown;
    };
    subscribe?: boolean;
  }) {
    const params = { ...parameters };
    const fullUri = `${adjustPath(service)}${method}`;
    const parsedUri = parseLS2Uri(fullUri);
    if (subscribe) {
      params.subscribe = subscribe;
    }
    let filepath = `${parsedUri.service}${parsedUri.category}${parsedUri.method}`;
    if (!methods.includes(method)) {
      filepath = `${filepath}${getHash(parsedUri, params)}`;
    }

    import(join(__dirname, '__mock__', `${filepath}.json`))
      .then((res) => {
        if (res.errorCode || res.returnValue === false) {
          onFailure(res);
        } else {
          onSuccess(res);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log({ service, method, parameters });
        onFailure(err);
      });

    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  cancel() {
    throw new Error('Not implemented');
  }
}
