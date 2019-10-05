import React, { useState } from 'react'
import { DialogContent, DialogTitle, Grid, Paper } from '@material-ui/core'


const containerStyle = {
  width: '100%',
  height: '100%'
}

const NdexLoginPanel = props => {
  const [isGoogle, setIsGoogle] = useState(true)

  const onError = (error, googleSSO) => {
    props.handleError(error)
    setIsGoogle({ googleSSO })
  }

  const {
    handleClose,
    onLoginSuccess,
    onSuccess,
    handleCredentialsSignOn,
    handleError,
    error
  } = props

  return (
    <div style={containerStyle}>
      <DialogTitle id="form-dialog-title">
        Sign in to your NDEx Account
      </DialogTitle>
      <DialogContent>
        <div className="NDExSignInContainer">
          <Grid container spacing={8}>
            <Grid item xs={6} className="grid">
              <Paper className="grid-paper">
                <div className="grid-content">
                  <GoogleSignOn
                    onError={this.onError}
                    googleSSO={googleSSO}
                    onLoginSuccess={onLoginSuccess}
                    onSuccess={onSuccess}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6} className="grid">
              <Paper className="grid-paper">
                <div className="grid-content">
                  <CredentialsSignOn
                    onLoginSuccess={onLoginSuccess}
                    handleClose={handleClose}
                    handleCredentialsSignOn={handleCredentialsSignOn}
                    handleError={handleError}
                    error={error}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </div>
  )
}

export default NdexLoginPanel
