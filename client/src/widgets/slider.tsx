import { PropsWithChildren } from 'react';
import SliderImpl, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, css } from '@chakra-ui/react';

// @see https://github.com/akiran/react-slick/issues/1655
const customStyle = css({
  '& .slick-list': {
    margin: '0 -7px',
  },
  ' & .slick-slide > div': {
    padding: ' 0 20px',
  },
});

export function Slider({ children, ...rest }: PropsWithChildren<Settings>) {
  return (
    <Box className="slider-container" css={customStyle}>
      <SliderImpl {...rest}>{children}</SliderImpl>
    </Box>
  );
}
