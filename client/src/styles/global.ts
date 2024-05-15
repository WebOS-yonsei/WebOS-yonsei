import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  .enact-fit {
    min-height: 100vh;
    bottom: auto;

    /* theme decorator */
    & > & {
      position: static;
      padding: 0;
    }
  }

  // FIXME: 일단 24px로 고정해두긴하는데... 이건 나중에 수정해야할듯
  html {
    font-size: 24px !important;
  }
`;
