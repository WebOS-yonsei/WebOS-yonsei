import { createFileRoute, redirect } from '@tanstack/react-router';
import { client } from '~/features/@api';
import { ProfileListPage } from '~/features/user';
import { assert } from '~/utils';

export const Route = createFileRoute('/_user/profile/')({
  beforeLoad: ({ context }) => {
    if (!context.user.isLogin) {
      throw redirect({
        to: '/login',
      });
    }

    if (context.user.hasProfile) {
      throw redirect({
        to: '/video/list',
      });
    }
  },
  loader: async ({ context }) => {
    assert(context.user.userId, 'user.userId is required');

    const { data, error } = await client.GET('/profiles/list', {
      params: {
        query: {
          user: {
            sessionId: 1,
          },
        },
      },
    });

    if (error || !data.profiles) {
      throw new Error('Failed to load profiles');
    }

    return data.profiles;
  },
  component: function ProfileList() {
    const profiles = Route.useLoaderData();
    return <ProfileListPage profiles={profiles} />;
  },
});
