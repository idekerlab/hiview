import React from 'react'
import Button from '@material-ui/core/Button'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser'

import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'

const styles = theme => ({
  button: {
    marginLeft: '1em',
    width: '3em'
  },
  icon: {
    height: '2.5em'
  }
})

const BASE_URL = 'http://search.ndexbio.org/?genes='

const OpenInExternalServiceButton = props => {
  const { classes, externalNetworks } = props

  const handleOpen = () => {
    // Simply open the data with the Portal
    const queryGeneString = props.genes.join(',')
    const queryUrl = BASE_URL + queryGeneString

    window.open(queryUrl, 'portal')
  }

  const handleMenu = () => {}
  const handleClose = () => {

  }

  return (
    <Tooltip title="Send gene list to external service..." placement="bottom">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={classes.button}
      />

      <div>
        <IconButton variant="contained" color="primary" onClick={handleMenu}>
          <OpenInBrowserIcon alt="Open in external service" />
        </IconButton>
        <Menu
          anchorEl={state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem key={idx} onClick={() => handleExample(idx)}>
            {example.name}
          </MenuItem>
        </Menu>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInExternalServiceButton)
