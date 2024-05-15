import { Heading, VStack, Wrap, WrapItem, Image, Text } from '@chakra-ui/react';
import { DefaultLayout, Link } from '~/widgets';

export function VideoListPage() {
  return (
    <DefaultLayout>
      <VStack align="stretch" spacing={20}>
        <VStack align="stretch" spacing={5}>
          <Heading fontSize="2xl">라바 님의 취향 저격 베스트 콘텐츠</Heading>
          <Wrap spacing="30px">
            {Array.from({ length: 5 }).map((_, index) => (
              <WrapItem key={index}>
                <Link to="/video/$videoId" params={{ videoId: index }}>
                  <VStack align="stretch">
                    <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
                    <Heading fontSize="md">콘텐츠 제목</Heading>
                    <Text fontSize={20}>콘텐츠 설명</Text>
                  </VStack>
                </Link>
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
        <VStack align="stretch" spacing={5}>
          <Heading fontSize="2xl">라바 님이 시청 중인 콘텐츠</Heading>
          <Wrap spacing="30px">
            {Array.from({ length: 5 }).map((_, index) => (
              <WrapItem key={index}>
                <Link to="/video/$videoId" params={{ videoId: index }}>
                  <VStack align="stretch">
                    <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
                    <Heading fontSize="md">콘텐츠 제목</Heading>
                    <Text fontSize={20}>콘텐츠 설명</Text>
                  </VStack>
                </Link>
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
      </VStack>
    </DefaultLayout>
  );
}
