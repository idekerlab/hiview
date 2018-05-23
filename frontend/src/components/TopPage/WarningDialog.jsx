import React from 'react'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'

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
