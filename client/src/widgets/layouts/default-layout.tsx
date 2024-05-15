import { PropsWithChildren } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { DefaultHeader } from './default-header';
import { DefaultFooter } from './default-footer';

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DefaultHeader />
      <Flex minH="100vh" align="stretch" justify="center" pt="160px" flexDir="column">
        <Box flexGrow={1} p="30px">
          {children}
        </Box>
        <DefaultFooter />
      </Flex>
    </>
  );
}
