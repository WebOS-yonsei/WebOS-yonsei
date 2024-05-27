import { Outlet, createFileRoute } from '@tanstack/react-router';
import { DefaultLayout } from '~/widgets';

export const Route = createFileRoute('/_layout')({
  component: () => (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  ),
});
