import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#fafafa',
    color: '#555555',
    maxWidth: '13em',
    fontSize: '1em',
    border: '1px solid #00A1DE',
    padding: '1.2em'
  }
}))(Tooltip)

export default HtmlTooltip
