import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const BrowserWarningDialog = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (navigator.userAgent.indexOf('Chrome') !== -1 || navigator.userAgent.indexOf('Safari') !== -1) {
      console.log('Compatible: Chrome or Safari', navigator.userAgent)
    } else {
      console.log('NOT Compatible: FF?', navigator.userAgent)
      setOpen(true)
    }
  }, [])

  const _handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'A Note on Browser Compatibility'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          HiView is intended to work best with <strong>Chrome or Safari</strong>. Because of incompatible rendering
          engine, texts cannot be displayed as intended in Firefox. Please use Chrome or Safari for optimal user
          experience.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BrowserWarningDialog
