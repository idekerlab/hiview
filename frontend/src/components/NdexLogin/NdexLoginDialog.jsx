import React from 'react'

import { Dialog, Button, Typography, Avatar } from '@material-ui/core'
import NdexUserInfoPanel from './NdexUserInfoPanel'
import NdexLoginPanel from './NdexLoginPanel'

const NdexLoginDialog = props => {
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

  return (
    <Dialog
      className="sign-in-container"
      open={this.props.ndexSave.ndexModal}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      {this.props.ndexSave.profile ? (
        NdexUserInfoPanel
      ) : (
        <NdexLoginPanel
          handleClose={handleClose}
          onLoginSuccess={onLoginSuccess}
          onLogout={onLogout}
          handleCredentialsSignOn={handleCredentialsSignOn}
          onSuccess={handleOnSuccess}
          handleError={handleError}
          error={props.ndexSave.errorMessage}
        />
      )}
    </Dialog>
  )
}

export default NdexLoginDialog
