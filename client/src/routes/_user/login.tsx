import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '~/features/user';

export const Route = createFileRoute('/_user/login')({
  component: LoginPage,
});
