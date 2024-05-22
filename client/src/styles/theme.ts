import { extendTheme } from '@chakra-ui/react';

// @see https://github.com/chakra-ui/chakra-ui/discussions/5048
export const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '#000',
        // @see https://github.com/chakra-ui/chakra-ui/discussions/5093
        color: 'white',
      },
    }),
  },
});
