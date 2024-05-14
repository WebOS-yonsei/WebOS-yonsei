import { createFileRoute } from '@tanstack/react-router';
import { VideoDetailPage } from '~/features/video';

export const Route = createFileRoute('/video/$videoId/')({
  component: function VideoDetail() {
    const { videoId } = Route.useParams();
    return <VideoDetailPage videoId={videoId} />;
  },
});
