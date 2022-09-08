import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button'
import ClipboardIcon from '@material-ui/icons/Assignment'
import Tooltip from '@material-ui/core/Tooltip'

import Notification from './Notification'

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
      fontSize: '1.5em',
      fontWeight: '500',
      textAlign: 'center',
    },
  }),
)

function handlePermission() {
  navigator.permissions.request({ name: 'geolocation' }).then(function(result) {
    if (result.state == 'granted') {
      report(result.state)
      geoBtn.style.display = 'none'
    } else if (result.state == 'prompt') {
      report(result.state)
      navigator.geolocation.getCurrentPosition(revealPosition, positionDenied, geoSettings)
    } else if (result.state == 'denied') {
      report(result.state)
      geoBtn.style.display = 'inline'
    }
    result.onchange = function() {
      report(result.state)
    }
  })
}

const CopyToClipboardButton = props => {
  const { genes } = props
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  const _handleCopy = () => {
    const geneString = genes.join(' ')
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.value = geneString
    input.focus()
    input.select()
    const result = document.execCommand('copy')

    if (result === 'unsuccessful') {
    } else {
      setOpen(true)
    }
    if (navigator.clipboard) {
      // navigator.clipboard.writeText(geneString)
    }

    document.body.removeChild(input)
  }

  return (
    <React.Fragment>
      <Tooltip title={<div className={classes.tooltip}>Copy gene list as text</div>} placement="bottom">
        <Button size="small" variant="outlined" color="primary" onClick={_handleCopy} className={classes.button}>
          <ClipboardIcon className={classes.icon} alt="Copy genes as text" />
        </Button>
      </Tooltip>
      <Notification count={genes.length} setOpen={setOpen} open={open} />
    </React.Fragment>
  )
}

export default CopyToClipboardButton
