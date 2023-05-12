import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#ECE1CB',
    },
    secondary: {
      main: '#EB6605',
    },
    error: {
      main: '#813504',
    },
    info: {
      main: '#BDB4A3',
    },
  },
});

export default theme;
