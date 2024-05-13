import { PropsWithChildren } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { VideoHeader } from './video-header';
import { VideoFooter } from './video-footer';

export function VideoLayout({ children }: PropsWithChildren) {
  return (
    <>
      <VideoHeader />
      <Flex minH="100vh" align="stretch" justify="center" pt="120px" flexDir="column">
        <Box flexGrow={1} p="30px">
          {children}
        </Box>
        <VideoFooter />
      </Flex>
    </>
  );
}
