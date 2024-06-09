import { extendTheme } from '@chakra-ui/react';

export const fonts = `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`;

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
  fonts: {
    heading: fonts,
    body: fonts,
  },
});
