import { createTheme } from '@mui/material/styles';

const baseTypography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontFamily: "'PixelGame', serif",
  },
  h2: {
    fontFamily: "'PixelGame', serif",
  },
  h3: {
    fontFamily: "'PixelGame', serif",
  },
  h4: {
    fontFamily: "'PixelGame', serif",
  },
  h5: {
    fontFamily: "'PixelGame', serif",
  },
  h6: {
    fontFamily: "'PixelGame', serif",
  },
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: baseTypography,
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: baseTypography,
});

export const createCustomTheme = (config) => {
  return createTheme({
    palette: {
      mode: config.mode || 'light',
      background: {
        default: config.backgroundDefault || '#fafafa',
        paper: config.backgroundPaper || '#ffffff',
      },
      text: {
        primary: config.textPrimary || '#000000',
        secondary: config.textSecondary || '#666666',
      },
      primary: {
        main: config.primaryColor || '#1976d2',
      },
      secondary: {
        main: config.secondaryColor || '#dc004e',
      },
    },
    typography: baseTypography,
  });
};

export const themes = {
  light: {
    name: 'Light',
    theme: lightTheme,
    isCustom: false,
  },
  dark: {
    name: 'Dark',
    theme: darkTheme,
    isCustom: false,
  },
};

export const themeNames = Object.keys(themes);
export { lightTheme, darkTheme };
