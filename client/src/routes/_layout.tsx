import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { DefaultLayout } from '~/widgets';

export const Route = createFileRoute('/_layout')({
  beforeLoad: ({ context }) => {
    if (!context.user.isLogin()) {
      throw redirect({
        to: '/login',
      });
    }

    if (!context.user.hasProfile()) {
      throw redirect({
        to: '/profile',
      });
    }
  },

  component: () => (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  ),
});
