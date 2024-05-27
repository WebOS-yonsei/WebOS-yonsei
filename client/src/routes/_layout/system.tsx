import { createFileRoute } from '@tanstack/react-router';
import { SystemPage } from '~/features/system';

export const Route = createFileRoute('/_layout/system')({
  component: () => <SystemPage />,
});
