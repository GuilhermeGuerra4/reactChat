import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#DDD9D9",
      secondary: "#646464",
      background: "#FFFFFF",
      borders: "#EDEDED",
      accent: "#2391CF",
      success: "#03B856",
      error: "#D02C2C",
      text: "#525252",
      textDark: "#666",
      textLight: "#fff",
      link: "#2391CF",
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "#DDD9D9",
      secondary: "#646464",
      background: "#FFFFFF",
      borders: "#EDEDED",
      accent: "#2391CF",
      success: "#03B856",
      error: "#D02C2C",
      text: "#525252",
      textDark: "#666",
      textLight: "#fff",
      link: "#2391CF",
    },
  },
};