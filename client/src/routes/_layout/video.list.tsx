import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { client } from '~/features/@api';
import { VideoListPage } from '~/features/video';
import { assert } from '~/utils';

const searchSchema = z.object({
  // @see https://github.com/colinhacks/zod/issues/2686
  index: z
    .nativeEnum({
      recommend: 0,
      watching: 1,
    } as const)
    .catch(0),
});

export const Route = createFileRoute('/_layout/video/list')({
  validateSearch: (search) => searchSchema.parse(search),
  loaderDeps: ({ search: { index } }) => ({ index }),
  loader: async ({
    context: {
      user: { profileId },
    },
    deps: { index },
  }) => {
    assert(profileId, '프로필이 필요합니다.');

    const getVideoList = async () => {
      if (index === 0) {
        const { data, error } = await client.GET('/videos', {
          params: {
            query: {
              user: {},
            },
          },
        });

        return { data: data?.contents, error };
      }
      if (index === 1) {
        const { data, error } = await client.GET('/profiles/{profileId}/history', {
          params: {
            query: {
              user: {},
            },
            path: {
              profileId,
            },
          },
        });

        return { data: data?.videos, error };
      }

      throw Error(`unreachable code... got index: ${index}`);
    };

    const [videoList, user] = await Promise.all([
      getVideoList(),
      client.GET('/users', {
        params: {
          query: {
            user: {},
          },
        },
      }),
    ]);

    if (!videoList.data || videoList.error || !user.data || user.error) {
      throw new Error('비디오 목록을 불러오는 중 오류가 발생했습니다.');
    }

    return {
      videoList: videoList.data,
      user: user.data,
    };
  },
  component: function VideoList() {
    const { videoList, user } = Route.useLoaderData();
    const { index } = Route.useSearch();
    return <VideoListPage videoList={videoList} user={user} index={index} />;
  },
});
