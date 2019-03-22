import { createMuiTheme } from '@material-ui/core/styles'
import { teal, pink, red } from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: teal,
    accent: pink,
    error: red
  }
})
