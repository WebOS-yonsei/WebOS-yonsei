import { Heading, VStack } from '@chakra-ui/react';
import { VideoPlayer } from './video-player';

export function VideoPlayingPage({ videoId }: { videoId: number }) {
  const MOCK_URL = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

  return (
    <VStack align="stretch" spacing={20}>
      <VStack align="stretch" spacing={5}>
        <Heading fontSize="2xl">{videoId}</Heading>
        <VideoPlayer src={MOCK_URL} videoId={videoId} />
      </VStack>
    </VStack>
  );
}
