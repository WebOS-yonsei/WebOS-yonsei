import createClient, { Middleware } from 'openapi-fetch';
import type { paths } from './scheme';
import { useUser } from '../user';

const authMiddleware: Middleware = {
  async onRequest(req) {
    const { sessionId } = useUser.getState();
    if (sessionId) {
      req.headers.set('Authorization', `${sessionId}`);
    }
    return req;
  },
};

export const client = createClient<paths>({ baseUrl: process.env.REACT_APP_SERVER_BASE_URL });

client.use(authMiddleware);
