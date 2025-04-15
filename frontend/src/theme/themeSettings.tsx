import { createTheme } from '@mui/material/styles';

const themeSettings = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          minHeight: 56,
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  },
});

export default themeSettings;
