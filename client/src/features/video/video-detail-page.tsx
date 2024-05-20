import { Heading, VStack, Image, Button, HStack, Text } from '@chakra-ui/react';
import { DefaultLayout, Link } from '~/widgets';

export function VideoDetailPage({ videoId }: { videoId: string }) {
  return (
    <DefaultLayout>
      <VStack align="stretch" spacing={20}>
        <VStack align="stretch" spacing={5}>
          <Heading fontSize="2xl">영상 상세</Heading>
          <HStack spacing={8} align="stretch">
            <VStack align="stretch">
              <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" aspectRatio="3 / 2" />
              <Link to="/video/$videoId/playing" params={{ videoId }}>
                <Button w="100%" colorScheme="red">
                  재생하기
                </Button>
              </Link>
            </VStack>
            <VStack align="stretch" w="100%">
              <Heading fontSize="2xl">동영상 제목</Heading>
              <Text>동영상 설명</Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </DefaultLayout>
  );
}
