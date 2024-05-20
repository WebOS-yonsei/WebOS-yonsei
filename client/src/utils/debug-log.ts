import { info } from '@enact/webos/pmloglib';
import { isBrowser } from './is-browser';
import { isTVBrowser } from './is-tv-browser';

export function debugLog(msgId: string, ...values: unknown[]) {
  if (!isBrowser()) return;

  const id = `Enact_${msgId}`;

  if (isTVBrowser()) {
    info(id, values, '');
  }

  if (['development', 'test'].includes(process.env.NODE_ENV!)) {
    // eslint-disable-next-line no-console
    console.log(id, values);
  }
}
