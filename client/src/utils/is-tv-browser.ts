import { isBrowser } from './is-browser';

export function isTVBrowser() {
  return isBrowser() && typeof window.webOSSystem === 'object';
}
