import React from 'react'

import Button from '@material-ui/core/Button'
import logo from '../../assets/images/cytoscape-logo.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  buttonIcon: {
    height: '2.5em',
    marginLeft: '1em'
  }
})

const BASE_URL = 'http://search-dev.ndexbio.org/?genes='

const OpenInPortalButton = props => {
  const { classes, externalNetworks } = props

  const handleOpen = () => {
    // Simply open the data with the Portal
    const queryGeneString = props.genes.join(',')
    const queryUrl = BASE_URL + queryGeneString

    window.open(queryUrl, 'portal')
  }

  return (
    <Tooltip title="Open in Portal" placement="bottom">
      <Button
        className={classes.buttonIcon}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        <img alt="Cytoscape logo" src={logo} className={classes.buttonIcon} />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInPortalButton)
