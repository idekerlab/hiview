import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button'
import ClipboardIcon from '@material-ui/icons/Assignment'

import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      width: '100%',
      marginTop: '0.5em',
      marginBottom: '0.5em',
    },
    icon: {
      marginLeft: '0.4em',
    },
  }),
)

const CopyToClipboardButton = props => {
  const { geneList } = props
  const classes = useStyles()

  const _handleCopy = () => {
    const genes = geneList.join(' ')
    console.log('Genes:', genes)
  }

  return (
    <Tooltip title="Copy genes above as space-delimited text to the clipboard" placement="bottom">
      <Button small fullwidth variant="outlined" color="primary" onClick={_handleCopy} className={classes.button}>
        Copy Gene List to Clipboard
        <ClipboardIcon className={classes.icon} alt="Copy gene list to clipboard" />
      </Button>
    </Tooltip>
  )
}

export default CopyToClipboardButton
