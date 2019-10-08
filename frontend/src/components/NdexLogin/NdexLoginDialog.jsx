import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
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
    alignItems: 'center',
  },
  ndexLogo: {
    height: '3em',
    marginRight: '1em'
  }
})

const NdexLoginDialog = props => {
  const classes = useStyles()
  // Open/Close state is always passed from parent component
  const { isOpen, isLogin, errorMessage, setDialogState } = props
  const onLoginSuccess = () => {}

  const onLogout = () => {
    // props.ndexSaveActions.setProfile(null)
    handleClose()
  }

  const handleClose = () => {
    // props.openNdexLoginDialog(false)
  }

  const handleCredentialsSignOn = event => {
    event.preventDefault()
    // this.props.ndexSaveActions.credentialsSignOn(event)
  }

  const handleOnSuccess = resp => {
    // this.props.ndexSaveActions.googleSignOn(resp)
  }

  const handleError = error => {
    // this.props.ndexSaveActions.setErrorMessage(error)
  }

  const getContent = () => {
    if (isLogin) {
      return <NdexUserInfoPanel {...props} />
    }

    return (
      <NdexLoginPanel
        setDialogState={setDialogState}
        onLoginSuccess={onLoginSuccess}
        onLogout={onLogout}
        handleCredentialsSignOn={handleCredentialsSignOn}
        onSuccess={handleOnSuccess}
        handleError={handleError}
        error={errorMessage}
      />
    )
  }

  return (
    <Dialog className={classes.root} open={isOpen}>
      <DialogTitle disableTypography={true} className={classes.title}>
        <div className={classes.titleWrapper}>
          <img src={NdexLogo} alt={'NDEx Logo'} className={classes.ndexLogo} />
          <div>
            <Typography variant={'title'}>{DEFAULT_TITLE}</Typography>
            <Typography variant={'subtitle1'}>{SUBTITLE}</Typography>
          </div>
        </div>
      </DialogTitle>
      <DialogContent className={classes.content}>{getContent()}</DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogState(false)} color={'default'}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NdexLoginDialog
