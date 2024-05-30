import { PropsWithChildren } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { DeferredPromise } from '@tanstack/react-router';
import { DefaultHeader } from './default-header';
import { DefaultFooter } from './default-footer';
import { components } from '~/features/@api';

export function DefaultLayout({
  children,
  user,
}: PropsWithChildren<{
  user: DeferredPromise<components['schemas']['CurrentUserResponse']>;
}>) {
  return (
    <Box minW="1200px">
      <DefaultHeader user={user} />
      <Flex minH="100vh" align="stretch" justify="center" pt="160px" flexDir="column">
        <Box flexGrow={1} p="30px">
          {children}
        </Box>
        <DefaultFooter />
      </Flex>
    </Box>
  );
}
