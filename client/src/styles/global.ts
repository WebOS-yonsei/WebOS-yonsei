import { css } from '@emotion/react';
import { fonts } from './theme';

export const globalStyles = css`
  * {
    box-sizing: border-box;
    font-family: ${fonts};
  }

  // FIXME: 일단 24px로 고정해두긴하는데... 이건 나중에 수정해야할듯
  html {
    font-size: 24px;
  }

  // :where(...) 연산자가 webOS에서 동작하지 않음
  button,
  input,
  optgroup,
  select,
  textarea {
    color: white;
  }
`;
