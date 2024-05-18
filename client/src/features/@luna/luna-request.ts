import { isDev } from '~/utils';

// @see https://github.com/kyuman/enact-template/blob/master/src/libs/request.js
export function lunaRequest() {
  if (isDev()) {
    // TODO
    // require('luna-mock');
    // return send(require('luna-mock').Request, 'luna://com.webos.service.bus', params);
  }

  // TODO
  // return send(LS2Request, service, params);
}
