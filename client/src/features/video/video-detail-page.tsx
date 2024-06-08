import { Heading, Image, Button, Text, Tag } from '@chakra-ui/react';
import { Link, VStack, HStack } from '~/widgets';
import { components } from '../@api';

export function VideoDetailPage({ videoId, videoInfo }: { videoId: number; videoInfo: components['schemas']['Contents'] }) {
  return (
    <VStack align="stretch" spacing={20}>
      <VStack align="stretch" spacing={5}>
        <Heading fontSize="2xl">영상 상세</Heading>
        <HStack spacing={8} align="stretch">
          <VStack align="stretch">
            <Image src={videoInfo.thumbnailURI} alt={videoInfo.title} aspectRatio="3 / 2" width={600} border="1px solid #eee" />
            <Link to="/video/$videoId/playing" params={{ videoId }}>
              <Button w="100%" colorScheme="red">
                재생하기
              </Button>
            </Link>
          </VStack>
          <VStack align="stretch" w="100%">
            <HStack>
              <Heading fontSize="2xl">{videoInfo.title}</Heading>
              <HStack>
                <Tag colorScheme="teal">{videoInfo.genre}</Tag>
                <Tag colorScheme="red">{videoInfo.duration}초</Tag>
                <Tag colorScheme="blue">{videoInfo.grade === 'ADULT' ? '성인' : '전체연령가'}</Tag>
              </HStack>
            </HStack>
            <Text>{videoInfo.description}</Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
