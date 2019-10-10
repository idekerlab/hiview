import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button, Tooltip } from '@material-ui/core'
import logo from './assets/images/ndex-logo.svg'
import { fade } from '@material-ui/core/styles/colorManipulator'
import NdexLoginDialog from './NdexLoginDialog'

import HtmlTooltip from './HtmlTooltip'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  button: {
    width: '11em',
    height: '3.5em',
    borderColor: '#4DA1DE',
    color: '#4DA1DE',
    '&:active': {
      borderColor: '#4DA1DE',
      color: '#4DA1DE'
    },
    '&:hover': {
      backgroundColor: fade('#4DA1DE', 0.2)
    }
  },
  buttonIcon: {
    height: '2.5em',
    marginLeft: '0.5em'
  }
})

const DEFAULT_HANDLER = loginState => {
  // Default callback function for login status change
  console.warn('Default handler: NDEx login state updated', loginState)

  // Add actual handler here...
}

/**
 *
 * @param props
 *  - This should include NDEx server URL (ndexServer)
 *
 * @returns {*}
 * @constructor
 */
const OpenNDExLoginButton = props => {
  const { ndexServer, onLoginStateUpdated } = props

  console.info('NDEx URL = ', ndexServer)

  let onUpdate = DEFAULT_HANDLER
  if (onLoginStateUpdated !== null && onLoginStateUpdated !== undefined) {
    onUpdate = onLoginStateUpdated
  }

  const classes = useStyles()
  const [isOpen, setOpen] = useState(false)
  const [icon, setButtonIcon] = useState(
    <img alt="NDEx logo" src={logo} className={classes.buttonIcon} />
  )

  const setIcon = iconComponent => {
    if (iconComponent === null) {
      setButtonIcon(
        <img alt="NDEx logo" src={logo} className={classes.buttonIcon} />
      )
    } else {
      setButtonIcon(iconComponent)
    }
  }

  const message = 'You need to sign in to use private networks in NDEx'
  const setDialogState = dialogState => {
    setOpen(dialogState)
  }

  return (
    <div>
      <HtmlTooltip
        placement={'right'}
        title={
          <React.Fragment>
            <Typography variant={'title'} color={'inherit'}>
              &larr; Sign in to NDEx
            </Typography>
            <Typography variant={'body1'}>{message}</Typography>
          </React.Fragment>
        }
      >
        <Button
          className={classes.button}
          variant={'outlined'}
          onClick={() => setDialogState(true)}
        >
          {icon}
        </Button>
      </HtmlTooltip>
      <NdexLoginDialog
        setIcon={setIcon}
        setDialogState={setDialogState}
        isOpen={isOpen}
        ndexServer={ndexServer}
        onLoginStateUpdated={onUpdate}
      />
    </div>
  )
}

export default OpenNDExLoginButton
