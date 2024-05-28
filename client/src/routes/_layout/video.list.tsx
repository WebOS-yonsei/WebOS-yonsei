import { createFileRoute } from '@tanstack/react-router';
import { client } from '~/features/@api';
import { VideoListPage } from '~/features/video';
import { assert } from '~/utils';

export const Route = createFileRoute('/_layout/video/list')({
  loader: async ({
    context: {
      user: { sessionId, profileId },
    },
  }) => {
    assert(sessionId, '로그인이 필요합니다.');
    assert(profileId, '프로필이 필요합니다.');

    const [videoList, historyList] = await Promise.all([
      client.GET('/videos', {
        params: {
          query: {
            user: {
              sessionId,
            },
          },
        },
      }),
      client.GET('/profiles/{profileId}/history', {
        params: {
          query: {
            user: {
              sessionId,
            },
          },
          path: {
            profileId,
          },
        },
      }),
    ]);

    if (!videoList.data?.contents || !historyList.data?.videos || videoList.error || historyList.error) {
      throw new Error('비디오 목록을 불러오는 중 오류가 발생했습니다.');
    }

    return {
      videoList: videoList.data.contents,
      historyList: historyList.data.videos,
    };
  },
  component: function VideoList() {
    const { videoList, historyList } = Route.useLoaderData();
    return <VideoListPage videoList={videoList} historyList={historyList} />;
  },
});
