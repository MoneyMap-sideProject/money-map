import { createGlobalStyle } from 'styled-components';

const resetTemplateLiteral = `
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0;
  }

  input,
  select,
  textarea,
  button {
    appearance: none;
  }

  button {
    padding: 0;
    background-color: transparent;
    border: 0;
  }
`;

const globalStyleTemplateLiteral = `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  input,
  select,
  textarea {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 600;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${resetTemplateLiteral}
  ${globalStyleTemplateLiteral}
`;

export default GlobalStyle;
