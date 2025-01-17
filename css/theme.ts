import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    secondary: {
      main: '#F9F9F9',
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& button': { color: 'black !important', fontWeight: 600 },
          '& .MuiTabs-indicator': { backgroundColor: 'black' },
        },
      },
    },
  },
})

export default theme
