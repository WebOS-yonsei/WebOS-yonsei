import { Heading, VStack, Wrap, WrapItem, Image, Text } from '@chakra-ui/react';
import { Link } from '~/widgets';
import { components } from '../@api';

export function VideoListPage({
  videoList,
  historyList,
  user,
}: {
  videoList: components['schemas']['Contents'][];
  historyList: components['schemas']['Contents'][];
  user: components['schemas']['CurrentUserResponse'];
}) {
  return (
    <VStack align="stretch" spacing={20}>
      <VStack align="stretch" spacing={5}>
        <Heading fontSize="2xl">{user.nickname}님의 취향 저격 베스트 콘텐츠</Heading>
        <Wrap spacing="30px">
          {videoList.map((video) => (
            <WrapItem key={video.id}>
              <Link to="/video/$videoId" params={{ videoId: video.id }}>
                <VStack align="stretch">
                  <Image src={video.thumbnailURI} alt={video.title} aspectRatio="3 / 2" />
                  <Heading fontSize="md">{video.title}</Heading>
                  <Text fontSize={20}>{video.description}</Text>
                </VStack>
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
      <VStack align="stretch" spacing={5}>
        <Heading fontSize="2xl">{user.nickname}님이 시청 중인 콘텐츠</Heading>
        <Wrap spacing="30px">
          {historyList.map((video) => (
            <WrapItem key={video.id}>
              <Link to="/video/$videoId" params={{ videoId: video.id }}>
                <VStack align="stretch">
                  <Image src={video.thumbnailURI} alt={video.title} aspectRatio="3 / 2" />
                  <Heading fontSize="md">{video.title}</Heading>
                  <Text fontSize={20}>{video.description}</Text>
                </VStack>
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </VStack>
  );
}
