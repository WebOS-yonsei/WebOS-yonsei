import { createFileRoute, redirect } from '@tanstack/react-router';
import { ProfileListPage } from '~/features/user';

export const Route = createFileRoute('/_user/profile/')({
  beforeLoad: ({ context }) => {
    if (!context.user.isLogin) {
      throw redirect({
        to: '/login',
      });
    }

    if (context.user.hasProfile) {
      throw redirect({
        to: '/video/list',
      });
    }
  },
  component: () => <ProfileListPage />,
});
