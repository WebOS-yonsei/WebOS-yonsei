import { Heading, VStack } from '@chakra-ui/react';
import { VideoLayout } from './video-layout';

export function VideoPlayingPage({ videoId }: { videoId: string }) {
  return (
    <VideoLayout>
      <VStack align="stretch" spacing={20}>
        <VStack align="stretch" spacing={5}>
          <Heading fontSize="2xl">{videoId}</Heading>
        </VStack>
      </VStack>
    </VideoLayout>
  );
}
