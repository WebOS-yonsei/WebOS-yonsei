import { createFileRoute } from '@tanstack/react-router';
import { ProfileListPage } from '~/features/user';

export const Route = createFileRoute('/profile/')({
  component: () => <ProfileListPage />,
});
