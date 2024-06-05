import { createFileRoute } from '@tanstack/react-router';
import { client } from '~/features/@api';
import { VideoListPage } from '~/features/video';
import { assert } from '~/utils';

export const Route = createFileRoute('/_layout/video/list')({
  loader: async ({
    context: {
      user: { profileId },
    },
  }) => {
    assert(profileId, '프로필이 필요합니다.');

    const [videoList, historyList, user] = await Promise.all([
      client.GET('/videos', {
        params: {
          query: {
            user: {},
          },
        },
      }),
      client.GET('/profiles/{profileId}/history', {
        params: {
          query: {
            user: {},
          },
          path: {
            profileId,
          },
        },
      }),
      client.GET('/users', {
        params: {
          query: {
            user: {},
          },
        },
      }),
    ]);

    if (!videoList.data?.contents || !historyList.data?.videos || !user.data || videoList.error || historyList.error || user.error) {
      throw new Error('비디오 목록을 불러오는 중 오류가 발생했습니다.');
    }

    return {
      videoList: videoList.data.contents,
      historyList: historyList.data.videos,
      user: user.data,
    };
  },
  component: function VideoList() {
    const { videoList, historyList, user } = Route.useLoaderData();
    return <VideoListPage videoList={videoList} historyList={historyList} user={user} />;
  },
});
