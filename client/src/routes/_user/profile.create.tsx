import { createFileRoute, redirect } from '@tanstack/react-router';
import { ProfileCreatePage } from '~/features/user';

export const Route = createFileRoute('/_user/profile/create')({
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
  component: () => <ProfileCreatePage />,
});
