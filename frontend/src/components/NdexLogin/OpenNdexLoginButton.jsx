import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import logo from './assets/images/ndex-logo.svg'
import { fade } from '@material-ui/core/styles/colorManipulator'
import NdexLoginDialog from './NdexLoginDialog'

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

  // State of dialog will be managed here
  const [isOpen, setOpen] = useState(false)
  const [isLogin, setLogin] = useState(false)

  const setDialogState = dialogState => {
    console.log('Open Login Dialog...', dialogState)
    setOpen(dialogState)
  }

  return (
    <div>
      <Button
        className={classes.root}
        variant={'outlined'}
        onClick={() => setDialogState(true)}
      >
        Login
        <img alt="NDEx logo" src={logo} className={classes.buttonIcon} />
      </Button>
      <NdexLoginDialog
        setDialogState={setDialogState}
        isOpen={isOpen}
        isLogin={isLogin}
        {...props}
      />
    </div>
  )
}

export default OpenNDExLoginButton
