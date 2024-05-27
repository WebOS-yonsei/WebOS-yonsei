import { createRootRouteWithContext } from '@tanstack/react-router';
import { User } from '~/features/user';

type RouterContext = {
  user: User;
};

export const Route = createRootRouteWithContext<RouterContext>();
