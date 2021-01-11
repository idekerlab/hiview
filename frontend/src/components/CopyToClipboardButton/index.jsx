import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button'
import ClipboardIcon from '@material-ui/icons/Assignment'

import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      width: '3.4em',
      margin: '0.25em',
    },
    icon: {
      fontSize: '2em',
    },
    tooltip: {
      fontSize: '16px',
      fontWeight: '300',
      textAlign: 'center',
    },
  }),
)

const CopyToClipboardButton = props => {
  const { genes } = props
  const classes = useStyles()

  const _handleCopy = () => {
    const geneString = genes.join(' ')
    console.log('Genes:', geneString)
    if (navigator.clipboard) {
      navigator.clipboard.writeText(geneString)
    }
  }

  return (
    <Tooltip
      title={<div className={classes.tooltip}>Copy genes above as space-delimited text to the clipboard</div>}
      placement="bottom"
    >
      <Button size="small" variant="outlined" color="primary" onClick={_handleCopy} className={classes.button}>
        <ClipboardIcon className={classes.icon} alt="Copy gene list to clipboard" />
      </Button>
    </Tooltip>
  )
}

export default CopyToClipboardButton
