import LS2Request from '@enact/webos/LS2Request';
import { isDev } from '~/utils';
import { MockLS2Request } from './mock-ls2-request';

type Request<Response> = {
  method: string;
  onSuccess: (res: Response) => void;
  onFailure: (res: Response) => void;
  parameters: {
    subscribe?: boolean;
    [key: string]: unknown;
  };
};

function send<Response>(Req: typeof LS2Request, service: string, params: Request<Response>) {
  if (params.parameters?.subscribe) {
    return new Req().send({
      service,
      method: params?.method,
      parameters: params?.parameters,
      onSuccess: params?.onSuccess,
      onFailure: params?.onFailure,
    });
  }

  return new Promise((onSuccess, onFailure) => {
    new Req().send({
      service,
      method: params?.method,
      parameters: params?.parameters,
      onSuccess,
      onFailure,
    });
  });
}

// @see https://github.com/kyuman/enact-template/blob/master/src/libs/request.js
export function lunaRequest<Response>(service: string) {
  return (params: Request<Response>) => {
    if (isDev()) {
      return send<Response>(MockLS2Request, service, params);
    }

    return send<Response>(LS2Request, service, params);
  };
}
