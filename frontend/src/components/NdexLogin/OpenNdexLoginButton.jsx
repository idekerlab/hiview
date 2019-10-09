import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button, Tooltip } from '@material-ui/core'
import logo from './assets/images/ndex-logo.svg'
import { fade } from '@material-ui/core/styles/colorManipulator'
import NdexLoginDialog from './NdexLoginDialog'

import HtmlTooltip from './HtmlTooltip'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
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

const OpenNDExLoginButton = props => {
  const classes = useStyles()
  const [isOpen, setOpen] = useState(false)

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
          className={classes.root}
          variant={'outlined'}
          onClick={() => setDialogState(true)}
        >
          {'Login'}
          <img alt="NDEx logo" src={logo} className={classes.buttonIcon} />
        </Button>
      </HtmlTooltip>
      <NdexLoginDialog
        setDialogState={setDialogState}
        isOpen={isOpen}
        {...props}
      />
    </div>
  )
}

export default OpenNDExLoginButton
