import { PropsWithChildren } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Link, VectorLogo } from '~/widgets';

export function UserLayout({ children }: PropsWithChildren) {
  return (
    <Flex minH="100vh" align="center" justify="center" py={8}>
      <Box as="nav" p={3} pos="fixed" top={0} left={0} width="100%">
        <Link to="/">
          <VectorLogo />
        </Link>
      </Box>
      {children}
    </Flex>
  );
}
