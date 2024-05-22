/* eslint-disable import/no-extraneous-dependencies */
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { routeTree } from '~/routeTree.gen';
import { globalStyles, theme } from '~/styles';

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => (
  <>
    <Global styles={globalStyles} />
    <ChakraProvider theme={theme}>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </ChakraProvider>
  </>
);
