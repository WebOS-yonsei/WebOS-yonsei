import LS2Request from '@enact/webos/LS2Request';
import { debugLog, isDev, isTVBrowser } from '~/utils';
import { MockLS2Request } from './mock-ls2-request';

// prettier-ignore
type Service = 
  | 'luna://com.webos.memorymanager'
  | 'luna://com.webos.applicationManager';

type Request<Response> = {
  method: string;
  onSuccess: (res: Response) => void;
  onFailure?: (res: Response) => void;
  parameters: {
    subscribe?: boolean;
    [key: string]: unknown;
  };
};

function send<Response>(Req: typeof LS2Request, service: Service, params: Request<Response>) {
  debugLog(`${params.method}[R]`);

  return new Req().send({
    service,
    method: params.method,
    parameters: params.parameters,
    onSuccess: (res: Response) => {
      debugLog(`${params.method}[S]`, res);
      params.onSuccess(res);
    },
    onFailure: (res: Response) => {
      debugLog(`${params.method}[F]`, res);
      params.onFailure?.(res);
    },
  });
}

// @see https://github.com/kyuman/enact-template/blob/master/src/libs/request.js
export function lunaRequest<Response>(service: Service) {
  const isMock = isDev() || !isTVBrowser();
  return (params: Request<Response>) => send<Response>(isMock ? MockLS2Request : LS2Request, service, params);
}
