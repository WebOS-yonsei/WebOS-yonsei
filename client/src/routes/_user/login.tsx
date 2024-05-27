import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginPage } from '~/features/user';

export const Route = createFileRoute('/_user/login')({
  beforeLoad: ({ context }) => {
    if (context.user.isLogin) {
      throw redirect({
        to: context.user.hasProfile ? '/profile' : '/video/list',
      });
    }
  },
  component: LoginPage,
});
