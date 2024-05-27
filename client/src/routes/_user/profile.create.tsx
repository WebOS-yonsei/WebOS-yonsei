import { createFileRoute } from '@tanstack/react-router';
import { ProfileCreatePage } from '~/features/user';

export const Route = createFileRoute('/_user/profile/create')({
  component: () => <ProfileCreatePage />,
});
