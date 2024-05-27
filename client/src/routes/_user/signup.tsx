import { createFileRoute } from '@tanstack/react-router';
import { SignUpPage } from '~/features/user';

export const Route = createFileRoute('/_user/signup')({
  component: SignUpPage,
});
