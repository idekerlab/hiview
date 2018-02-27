import React, { Component } from 'react'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'

const ErrorDialog = props => (
  <Dialog
    open={props.openError}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {'Please enter a NDEx UUID'}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        You have to provide a NDEx UUID or select one from the example list.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => props.openErrorDialogAction(false)} color="primary" autoFocus>
        OK
      </Button>
    </DialogActions>
  </Dialog>
)

export default ErrorDialog
