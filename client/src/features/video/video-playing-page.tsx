import { Heading, VStack } from '@chakra-ui/react';
import { VideoPlayer } from './video-player';
import { components } from '../@api';
import { assert } from '~/utils';

export function VideoPlayingPage({ videoId, videoInfo }: { videoId: number; videoInfo: components['schemas']['Contents'] }) {
  assert(videoInfo.sourceURI, 'sourceURI가 비어있음');

  return (
    <VStack align="stretch" spacing={20}>
      <VStack align="stretch" spacing={5}>
        <Heading fontSize="2xl">{videoId}</Heading>
        <VideoPlayer src={videoInfo.sourceURI} videoId={videoId} />
      </VStack>
    </VStack>
  );
}
