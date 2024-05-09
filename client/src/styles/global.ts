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
      padding: 0 1rem;
    }
  }
`;
