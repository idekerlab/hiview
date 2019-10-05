import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import logo from './assets/images/ndex-logo.svg'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles({
  root: {
    width: '14em',
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

  const handleOpenDialog = evt => {
    const newOpenState = !isOpen
    console.log('Open Login Dialog...', newOpenState)
    setOpen(newOpenState)
  }

  return (
    <Button
      className={classes.root}
      variant={'outlined'}
      onClick={handleOpenDialog}
    >
      Login
      <img alt="NDEx logo" src={logo} className={classes.buttonIcon} />
    </Button>
  )
}

export default OpenNDExLoginButton
