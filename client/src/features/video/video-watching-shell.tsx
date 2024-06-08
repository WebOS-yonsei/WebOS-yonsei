import { Heading, Image, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { components } from '../@api';
import { VStack } from '~/widgets';

export function VideoWatchingShell({ user, videoList }: { videoList: components['schemas']['Contents'][]; user: components['schemas']['CurrentUserResponse'] }) {
  return (
    <VStack align="stretch" spacing={5}>
      <Heading fontSize="xl" px={2}>
        {user.nickname}님이 시청 중인 콘텐츠
      </Heading>
      {videoList.length === 0 ? (
        <Text fontSize="md">시청 중인 콘텐츠가 없습니다.</Text>
      ) : (
        <Wrap spacing={0}>
          {videoList.map((video) => (
            <WrapItem key={video.id} w="25%" p={2}>
              <Link to="/video/$videoId" params={{ videoId: String(video.id) }}>
                <VStack align="stretch">
                  <Image src={video.thumbnailURI} alt={video.title} aspectRatio="3 / 2" border="1px solid #eee" maxW="100%" />
                  <Heading fontSize="md">{video.title}</Heading>
                </VStack>
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </VStack>
  );
}
