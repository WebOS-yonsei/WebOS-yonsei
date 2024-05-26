import createClient from 'openapi-fetch';
import type { paths } from './scheme';

export const client = createClient<paths>({ baseUrl: process.env.REACT_APP_SERVER_BASE_URL });
