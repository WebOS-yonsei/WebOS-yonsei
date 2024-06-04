import { assert } from './assert';

export function getImageUrl(url: string) {
  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  assert(baseUrl, 'REACT_APP_SERVER_BASE_URL이 비어있음');

  return `${baseUrl}/${url}`;
}
