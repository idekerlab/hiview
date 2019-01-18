import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const WarningDialog = props => (
  <Dialog
    open={props.open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description" style={{ color: 'red' }}>
        {props.message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => props.openWarningDialogAction(false)}
        color="default"
        autoFocus
      >
        Cancel
      </Button>
      <Button onClick={() => handleLoad(props)} color="secondary">
        Load anyway
      </Button>
    </DialogActions>
  </Dialog>
)

const handleLoad = props => {
  props.openWarningDialogAction(false)
  props.loadAction()
}

export default WarningDialog
