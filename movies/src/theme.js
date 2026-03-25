import { createTheme } from '@mui/material/styles';

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
  typography: {
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
  },
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
  typography: {
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
  },
});


export const themes = {
  light: {
    name: 'Light',
    theme: lightTheme,
  },
  dark: {
    name: 'Dark',
    theme: darkTheme,
  },
};

export const themeNames = Object.keys(themes);
export { lightTheme, darkTheme };
