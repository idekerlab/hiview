import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import logo from './assets/images/ndex-logo.svg'
import { fade } from '@material-ui/core/styles/colorManipulator'
import NdexLoginDialog from './NdexLoginDialog'

import HtmlTooltip from './HtmlTooltip'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  button: {
    width: '10em',
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

const TOOLTIP_MESSAGE = {
  logout: {
    title: 'Sign in to NDEx',
    message: 'You need to sign in to use private networks in NDEx'
  },
  login: {
    title: 'Logged in',
    message: 'Now you can access private networks'
  }
}

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
  const classes = useStyles()
  const { ndexServer, onLoginStateUpdated } = props

  const defaultIconComponent = (
    <img alt="NDEx logo" src={logo} className={classes.buttonIcon} />
  )

  let onUpdate = DEFAULT_HANDLER
  if (onLoginStateUpdated !== null && onLoginStateUpdated !== undefined) {
    onUpdate = onLoginStateUpdated
  }

  const [isOpen, setOpen] = useState(false)
  const [isLogin, setLogin] = useState(false)
  const [icon, setButtonIcon] = useState(defaultIconComponent)

  const setIcon = iconComponent => {
    setButtonIcon(iconComponent !== null ? iconComponent : defaultIconComponent)
  }

  const setDialogState = dialogState => {
    setOpen(dialogState)
  }

  const tooltipText = isLogin ? TOOLTIP_MESSAGE.login : TOOLTIP_MESSAGE.logout

  return (
    <div>
      <HtmlTooltip
        placement={'right'}
        title={
          <React.Fragment>
            <Typography variant={'title'} color={'inherit'}>
              {tooltipText.title}
            </Typography>
            <Typography variant={'body1'}>{tooltipText.message}</Typography>
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
        setIsLogin={setLogin}
        ndexServer={ndexServer}
        onLoginStateUpdated={onUpdate}
      />
    </div>
  )
}

export default OpenNDExLoginButton
