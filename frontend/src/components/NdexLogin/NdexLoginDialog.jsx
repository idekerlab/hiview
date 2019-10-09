import React, { useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider
} from '@material-ui/core'
import NdexUserInfoPanel from './NdexUserInfoPanel'
import NdexLoginPanel from './NdexLoginPanel'
import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

import NdexLogo from './assets/images/ndex-logo.svg'

const DEFAULT_TITLE = 'Sign in to your NDEx Account'
const SUBTITLE = 'Choose one of the following sign in methods:'
const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0
  },
  content: {
    padding: 0,
    margin: 0
  },
  title: {
    color: '#444444',
    padding: '0.8em'
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  ndexLogo: {
    height: '3em',
    marginRight: '1em'
  },
  actionPanel: {
    margin: 0,
    padding: '0.3em'
  }
})

const NdexLoginDialog = props => {
  const classes = useStyles()

  const [isLogin, setLogin] = useState(false)
  const [googleLogin, setGoogleLogin] = useState(null)

  // Open/Close state is always passed from parent component
  const { isOpen, errorMessage, setDialogState } = props

  const onLoginSuccess = event => {
    console.log('Login success:', event)
  }

  const onLogout = () => {
    console.log('Logout:')
    setLogin(false)
    // props.ndexSaveActions.setProfile(null)
  }

  const handleCredentialsSignOn = event => {
    console.log('Credential:', event)
  }

  const onGoogleSuccess = userInfo => {
    console.log('Google:', userInfo)
    setLogin(true)
    setGoogleLogin(userInfo)
    console.log('Google Set:', userInfo)
    // setDialogState(false)
  }

  const handleError = error => {
    console.log('Error:', resp)
    // this.props.ndexSaveActions.setErrorMessage(error)
  }

  const loginStateUpdated = (login, error) => {
    // User should
  }

  const getContent = () => {
    if (isLogin && googleLogin !== null) {
      console.log('Showing G info:', googleLogin)
      return (
        <NdexUserInfoPanel
          userName={googleLogin.profileObj.name}
          userImage={googleLogin.profileObj.imageUrl}
          onLogout={onLogout}
        />
      )
    }

    return (
      <NdexLoginPanel
        setDialogState={setDialogState}
        onLoginSuccess={onLoginSuccess}
        onLogout={onLogout}
        handleCredentialsSignOn={handleCredentialsSignOn}
        onSuccess={onGoogleSuccess}
        handleError={handleError}
        error={errorMessage}
      />
    )
  }

  return (
    <Dialog className={classes.root} open={isOpen}>
      {isLogin ? (
        <div />
      ) : (
        <DialogTitle disableTypography={true} className={classes.title}>
          <div className={classes.titleWrapper}>
            <img
              src={NdexLogo}
              alt={'NDEx Logo'}
              className={classes.ndexLogo}
            />
            <div>
              <Typography variant={'title'}>{DEFAULT_TITLE}</Typography>
              <Typography variant={'subtitle1'}>{SUBTITLE}</Typography>
            </div>
          </div>
        </DialogTitle>
      )}
      <DialogContent className={classes.content}>{getContent()}</DialogContent>
      <Divider />
      <DialogActions className={classes.actionPanel}>
        <Button
          variant={'outlined'}
          onClick={() => setDialogState(false)}
          color={'default'}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NdexLoginDialog
