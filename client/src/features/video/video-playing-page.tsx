import { Heading, VStack } from '@chakra-ui/react';
import { VideoPlayer } from './video-player';
import { DefaultLayout } from '~/widgets';

export function VideoPlayingPage({ videoId }: { videoId: string }) {
  const MOCK_URL = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

  return (
    <DefaultLayout>
      <VStack align="stretch" spacing={20}>
        <VStack align="stretch" spacing={5}>
          <Heading fontSize="2xl">{videoId}</Heading>
          <VideoPlayer src={MOCK_URL} />
        </VStack>
      </VStack>
    </DefaultLayout>
  );
}
