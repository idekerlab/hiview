import React from 'react'
import { Avatar, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  signInHeader: {
    display: 'flex',
    padding: '10px'
  },
  ndexAccountGreeting: {
    flexGrow: 1
  }
})

const NdexUserInfoPanel = props => {
  const classes = useStyles()

  return (
    <div className={classes.signInHeader}>
      <Avatar className="ndex-account-avatar" src={props.profile.image}>
        U
      </Avatar>
      <Typography variant="h4" className={classes.ndexAccountGreeting}>
        Hi, {props.profile.name}
      </Typography>
      <Button onClick={props.onLogout}>Logout</Button>
    </div>
  )
}

export default NdexUserInfoPanel
