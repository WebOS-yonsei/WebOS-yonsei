import { VStack, Heading, Image, Text, Grid, GridItem } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { components } from '../@api';

export function VideoWatchingShell({ user, videoList }: { videoList: components['schemas']['Contents'][]; user: components['schemas']['CurrentUserResponse'] }) {
  return (
    <VStack align="stretch" spacing={5}>
      <Heading fontSize="xl">{user.nickname}님이 시청 중인 콘텐츠</Heading>
      {videoList.length === 0 ? (
        <Text fontSize="md">시청 중인 콘텐츠가 없습니다.</Text>
      ) : (
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {videoList.map((video) => (
            <GridItem key={video.id}>
              <Link to="/video/$videoId" params={{ videoId: String(video.id) }}>
                <VStack align="stretch">
                  <Image src={video.thumbnailURI} alt={video.title} aspectRatio="3 / 2" border="1px solid #eee" />
                  <Heading fontSize="md">{video.title}</Heading>
                </VStack>
              </Link>
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  );
}
