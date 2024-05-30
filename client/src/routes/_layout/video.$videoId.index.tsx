import { createFileRoute } from '@tanstack/react-router';
import { client } from '~/features/@api';
import { VideoDetailPage } from '~/features/video';
import { assert } from '~/utils';

export const Route = createFileRoute('/_layout/video/$videoId/')({
  loader: async ({
    context: {
      user: { sessionId },
    },
    params: { videoId },
  }) => {
    assert(sessionId, 'sessionId가 비어있음');

    const { data, error } = await client.POST('/videos/{videoId}', {
      params: {
        query: {
          user: {
            sessionId,
          },
        },
        path: {
          videoId: Number(videoId),
        },
      },
    });

    if (!data || error) {
      throw new Error('비디오 정보를 가져오는데 실패했습니다');
    }

    return {
      videoInfo: data,
    };
  },
  component: function VideoDetail() {
    const { videoId } = Route.useParams();
    const { videoInfo } = Route.useLoaderData();
    return <VideoDetailPage videoId={Number(videoId)} videoInfo={videoInfo} />;
  },
});
