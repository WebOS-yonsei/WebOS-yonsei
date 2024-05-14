import { createFileRoute } from '@tanstack/react-router';
import { VideoPlayingPage } from '~/features/video';

export const Route = createFileRoute('/video/$videoId/playing')({
  component: function VideoDetail() {
    const { videoId } = Route.useParams();
    return <VideoPlayingPage videoId={videoId} />;
  },
});
