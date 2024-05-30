import { Heading, VStack, Image, Button, HStack, Text } from '@chakra-ui/react';
import { Link } from '~/widgets';
import { components } from '../@api';

export function VideoDetailPage({ videoId, videoInfo }: { videoId: number; videoInfo: components['schemas']['Contents'] }) {
  return (
    <VStack align="stretch" spacing={20}>
      <VStack align="stretch" spacing={5}>
        <Heading fontSize="2xl">영상 상세</Heading>
        <HStack spacing={8} align="stretch">
          <VStack align="stretch">
            <Image src={videoInfo.thumbnailURI} alt={videoInfo.title} aspectRatio="3 / 2" />
            <Link to="/video/$videoId/playing" params={{ videoId }}>
              <Button w="100%" colorScheme="red">
                재생하기
              </Button>
            </Link>
          </VStack>
          <VStack align="stretch" w="100%">
            <Heading fontSize="2xl">{videoInfo.title}</Heading>
            <Text>{videoInfo.description}</Text>
            <Text>{videoInfo.genre}</Text>
            <Text>{videoInfo.duration}초</Text>
            <Text>{videoInfo.grade === 'ADULT' ? '성인' : '전체연령가'}</Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
