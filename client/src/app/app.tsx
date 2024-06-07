/* eslint-disable import/no-extraneous-dependencies */
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { routeTree } from '~/routeTree.gen';
import { colorModeTheme, globalStyles, theme } from '~/styles';
import { useUser } from '~/features/user';
import { ModalConsumer, ModalProvider } from '~/features/@context';

const history = createHashHistory();

const router = createRouter({
  routeTree,
  context: {
    user: undefined!,
  },
  history,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  const user = useUser();

  return (
    <>
      <Global styles={globalStyles} />
      <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top-right' } }}>
        <ModalProvider>
          <Suspense>
            <RouterProvider
              router={router}
              context={{
                user,
              }}
            />
          </Suspense>
          <ModalConsumer />
          <ColorModeScript initialColorMode={colorModeTheme.config.initialColorMode} />
        </ModalProvider>
      </ChakraProvider>
    </>
  );
};
