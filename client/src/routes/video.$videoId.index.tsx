import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/video/$videoId/')({
  component: function VideoDetail() {
    const { videoId } = Route.useParams();
    return <div>hello {videoId}</div>;
  },
});
