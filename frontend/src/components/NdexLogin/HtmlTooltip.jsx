import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#fafafa',
    color: '#555555',
    maxWidth: '15em',
    fontSize: '1em',
    border: '2px solid #00A1DE',
    padding: '1.5em'
  }
}))(Tooltip)

export default HtmlTooltip
