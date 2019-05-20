import React from 'react'

import Button from '@material-ui/core/Button'
import logo from '../../assets/images/cytoscape-logo.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import * as cyrestApi from '../../api/cyrest'

const styles = theme => ({
  button: {
    marginLeft: '1em',
    width: '3em'
  },
  icon: {
    height: '2.5em'
  }
})

const OpenInCytoscapeButton = props => {

  const { classes, externalNetworks, rawInteractions } = props

  const handleImportNetwork = () => {

    console.log('EXT:', externalNetworks, props)

    const selectedNetwork = externalNetworks.selectedNetwork
    if(selectedNetwork === null) {

      // TODO: add filter call here.
      cyrestApi.postNetwork(1234, rawInteractions.originalCX)
    } else {
      cyrestApi.postNetwork(1234, externalNetworks.selectedNetwork.cx)
    }
  }

  return (
    <Tooltip title="Open in Cytoscape" placement="bottom">
      <Button
        className={classes.button}
        variant="contained"
        color="default"
        onClick={handleImportNetwork}
      >
        <img alt="Cytoscape logo" src={logo} className={classes.icon} />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
