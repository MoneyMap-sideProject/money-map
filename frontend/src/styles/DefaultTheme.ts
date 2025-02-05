import { DefaultTheme } from 'styled-components';
import 'styled-components';

// and extend them!
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
  }
}

const Theme: DefaultTheme = {
  colors: {
    primary: '#CEEB45',
    primaryDark: '#A8BF38',
    grayBg: '#F5F5F5',
    grayLine: '#EEEEEE',
    grayMiddle: 'bbbbbb',
    grayDark: '#787878',
    black: '#000000',
    white: '#ffffff',
    error: '#EB4545',
  },
};

export default Theme;
