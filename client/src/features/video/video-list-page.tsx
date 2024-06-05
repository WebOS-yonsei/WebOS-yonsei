import { Heading, VStack, Wrap, WrapItem, Image, Text } from '@chakra-ui/react';
import { Link, Slider } from '~/widgets';
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
        <Slider speed={500} slidesToShow={3} slidesToScroll={1} infinite={false}>
          {videoList.map((video) => (
            <Link to="/video/$videoId" params={{ videoId: video.id }} flexShrink={0} key={video.id}>
              <VStack align="stretch">
                <Image src={video.thumbnailURI} alt={video.title} aspectRatio="3 / 2" border="1px solid #eee" />
                <Heading fontSize="md">{video.title}</Heading>
              </VStack>
            </Link>
          ))}
        </Slider>
      </VStack>
      <VStack align="stretch" spacing={5}>
        <Heading fontSize="2xl">{user.nickname}님이 시청 중인 콘텐츠</Heading>
        {historyList.length === 0 ? (
          <Text fontSize="md">시청 중인 콘텐츠가 없습니다.</Text>
        ) : (
          <Wrap spacing="30px">
            {historyList.map((video) => (
              <WrapItem key={video.id}>
                <Link to="/video/$videoId" params={{ videoId: video.id }}>
                  <VStack align="stretch">
                    <Image src={video.thumbnailURI} alt={video.title} aspectRatio="3 / 2" width={300} border="1px solid #eee" />
                    <Heading fontSize="md">{video.title}</Heading>
                  </VStack>
                </Link>
              </WrapItem>
            ))}
          </Wrap>
        )}
      </VStack>
    </VStack>
  );
}
