import { Outlet, createFileRoute } from '@tanstack/react-router';
import { UserLayout } from '~/features/user/user-layout';

export const Route = createFileRoute('/_user')({
  component: () => (
    <UserLayout>
      <Outlet />
    </UserLayout>
  ),
});
