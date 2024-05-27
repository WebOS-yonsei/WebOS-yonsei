import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignUpPage } from '~/features/user';

export const Route = createFileRoute('/_user/signup')({
  beforeLoad: ({ context }) => {
    if (context.user.isLogin) {
      throw redirect({
        to: context.user.hasProfile ? '/profile' : '/video/list',
      });
    }
  },
  component: SignUpPage,
});
