import { createFileRoute } from '@tanstack/react-router';
import { VideoListPage } from '~/features/video';

export const Route = createFileRoute('/video/list')({
  component: function VideoList() {
    return <VideoListPage />;
  },
});
