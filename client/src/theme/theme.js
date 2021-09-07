import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#DEDEDE",
      secondary: "#444444",
      accent: "#2391CF",
      success: "#03B856",
      error: "#D02C2C",
      text: "#525252",
      link: "#2391CF",
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "#DEDEDE",
      secondary: "#444444",
      accent: "#2391CF",
      success: "#03B856",
      error: "#D02C2C",
      text: "#525252",
      link: "#2391CF",
    },
  },
};