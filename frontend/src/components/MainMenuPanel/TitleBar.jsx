import React from 'react'

import { withStyles } from 'material-ui/styles'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'

import CloseIcon from 'material-ui-icons/KeyboardArrowLeft'
import SettingsIcon from 'material-ui-icons/Settings'

const styles = {
  menuButton: {
    marginLeft: 20,
    marginRight: -20
  },
  titleButton: {
    marginRight: 10
  },
  title: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
}

const TitleBar = props => {
  const { classes } = props

  return (
    <AppBar position="fixed">
      <Toolbar>
        <div className={classes.title}>
          <SettingsIcon className={classes.titleButton} />

          <Typography variant="headline" color="inherit">
            Control Panel
          </Typography>
        </div>

        <IconButton className={classes.menuButton}>
          <CloseIcon onClick={e => handleClose(props)} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const handleClose = props => {
  const currentPanelState = props.uiState.get('showMainMenu')
  props.uiStateActions.showMainMenu(!currentPanelState)
}

export default withStyles(styles)(TitleBar)
