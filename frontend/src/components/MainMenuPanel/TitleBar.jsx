import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/KeyboardArrowLeft'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles({
  menuButton: {
    color: '#FFFFFF'
  },
  titleButton: {
    marginRight: 10
  },
  root: {
    backgroundColor: 'teal',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alighItems: 'center'
  }
})

const TitleBar = props => {
  const classes = useStyles()

  return (
    <Toolbar className={classes.root}>
      <SettingsIcon className={classes.titleButton} />
      <Typography variant="h5" color="inherit">
        Control Panel
      </Typography>

      <IconButton
        className={classes.menuButton}
        onClick={e => handleClose(props)}
      >
        <CloseIcon />
      </IconButton>
    </Toolbar>
  )
}

const handleClose = props => {
  const currentPanelState = props.uiState.get('showMainMenu')
  props.uiStateActions.showMainMenu(!currentPanelState)
}

export default TitleBar
