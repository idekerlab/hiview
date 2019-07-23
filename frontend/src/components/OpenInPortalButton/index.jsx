import React from 'react'

import Button from '@material-ui/core/Button'
import OpenIcon from '@material-ui/icons/OpenInBrowser'

import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  button: {
    marginLeft: '0.5em',
    width: '8em',
    minWidth: '8em',
    maxWidth: '8em',
    minHeight: '4em',
    maxHeight: '4em',
    padding: 0,
    height: '4em'
  },
  icon: {
    marginLeft: '0.3em'
  }
})

const BASE_URL = 'http://search.ndexbio.org/?genes='

const OpenInPortalButton = props => {
  const { classes, externalNetworks } = props

  const handleOpen = () => {
    // Simply open the data with the Portal
    const queryGeneString = props.genes.join(',')
    const queryUrl = BASE_URL + queryGeneString

    window.open(queryUrl, 'portal')
  }

  return (
    <Tooltip title="Search genes in the Portal" placement="bottom">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={classes.button}
      >
        Portal
        <OpenIcon className={classes.icon} alt="Open in Search Portal" />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInPortalButton)
