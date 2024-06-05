import { createFileRoute } from '@tanstack/react-router';
import { client } from '~/features/@api';
import { VideoPlayingPage } from '~/features/video';

export const Route = createFileRoute('/_layout/video/$videoId/playing')({
  loader: async ({ params: { videoId } }) => {
    const { data, error } = await client.GET('/videos/{videoId}', {
      params: {
        query: {
          user: {},
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
    const { videoId: _videoId } = Route.useParams();
    const videoId = Number(_videoId);

    const { videoInfo } = Route.useLoaderData();

    return <VideoPlayingPage videoId={videoId} videoInfo={videoInfo} />;
  },
});
