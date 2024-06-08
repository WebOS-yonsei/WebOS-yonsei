import { Heading } from '@chakra-ui/react';
import { VStack } from '~/widgets';
import { VideoPlayer } from './video-player';
import { components } from '../@api';
import { assert } from '~/utils';

export function VideoPlayingPage({ videoId, videoInfo }: { videoId: number; videoInfo: components['schemas']['ContentInfo'] }) {
  assert(videoInfo.sourceURI, 'sourceURI가 비어있음');

  return (
    <VStack align="stretch" spacing={20}>
      <VStack align="stretch" spacing={5}>
        <Heading fontSize="2xl">{videoInfo.title}</Heading>
        <VideoPlayer src={videoInfo.sourceURI} videoId={videoId} time={videoInfo.currentPlaybackTime} />
      </VStack>
    </VStack>
  );
}
