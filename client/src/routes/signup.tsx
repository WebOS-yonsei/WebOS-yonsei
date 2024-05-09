import { createFileRoute } from '@tanstack/react-router';
import { SignUpPage } from '../features/user';

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
});
