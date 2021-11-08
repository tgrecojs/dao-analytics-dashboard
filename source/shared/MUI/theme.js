import { createTheme } from '@mui/material/styles'
import { deepOrange, purple, lightBlue, orange } from '@mui/material/colors'
const defaultPalette = {
  primary: {
    main: '#3088e8',
  },
  secondary: {
    main: '#f50057',
  },
}


const theme = createTheme({
  ...defaultPalette,
  typography: {
    fontFamily: [
      "Roboto", "Helvetica", "Arial", "sans-serif"
    ].join(',')
  }
})

export default theme
