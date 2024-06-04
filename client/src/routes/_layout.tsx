import { Outlet, createFileRoute, defer, redirect } from '@tanstack/react-router';
import { client } from '~/features/@api';
import { DefaultLayout } from '~/widgets';

export const Route = createFileRoute('/_layout')({
  beforeLoad: ({ context }) => {
    if (!context.user.isLogin()) {
      throw redirect({
        to: '/login',
      });
    }

    if (!context.user.hasProfile()) {
      throw redirect({
        to: '/profile',
      });
    }
  },
  loader: async () => {
    const user = defer(
      (async () => {
        const { data, error } = await client.GET('/users', {
          params: {
            query: {
              user: {},
            },
          },
        });

        if (!data || error) {
          throw new Error('사용자 정보를 불러오는 중 오류가 발생했습니다.');
        }

        return data;
      })(),
    );

    return {
      user,
    };
  },
  component: function Layout() {
    const { user } = Route.useLoaderData();

    return (
      <DefaultLayout user={user}>
        <Outlet />
      </DefaultLayout>
    );
  },
});
