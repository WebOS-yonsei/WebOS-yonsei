import { createFileRoute } from '@tanstack/react-router';
import { ProfileCreatePage } from '~/features/user';

export const Route = createFileRoute('/profile/create')({
  component: () => <ProfileCreatePage />,
});
