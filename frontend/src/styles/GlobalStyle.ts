import { createGlobalStyle } from 'styled-components';

const resetTemplateLiteral = `
  body,
  p {
    margin: 0;
  }

  input,
  select,
  textarea {
    appearance: none;
  }
`;

const globalStyleTemplateLiteral = `
  body,
  input,
  select,
  textarea {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${resetTemplateLiteral}
  ${globalStyleTemplateLiteral}
`;

export default GlobalStyle;
