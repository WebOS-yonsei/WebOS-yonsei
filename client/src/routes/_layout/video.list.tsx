import { createFileRoute } from '@tanstack/react-router';
import { VideoListPage } from '~/features/video';

export const Route = createFileRoute('/_layout/video/list')({
  component: function VideoList() {
    return <VideoListPage />;
  },
});
