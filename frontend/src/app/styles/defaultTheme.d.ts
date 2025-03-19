declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      grayBg: string;
      grayLine: string;
      grayMiddle: string;
      grayDark: string;
      black: string;
      white: string;
      error: string;
    };
    pageLayout: {
      breakPoint: string;
      paddingX: string;
    };
  }
}
