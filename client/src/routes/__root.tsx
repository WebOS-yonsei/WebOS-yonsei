import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { User } from '~/features/user';
import { ScrollToTop } from '~/features/@business';
import { ScrollButtonGroup } from '~/widgets/scroll-button-group';

type RouterContext = {
  user: User;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <ScrollToTop />
      <Outlet />
      <ScrollButtonGroup />
    </>
  ),
});
