import React from 'react'

import Button from '@material-ui/core/Button'
import logo from '../../assets/images/cytoscape-logo-white.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import * as cyrestApi from '../../api/cyrest'

const styles = theme => ({
  button: {
    marginLeft: '0.5em',
    width: '5em',
    minWidth: '5em',
    maxWidth: '5em',
    minHeight: '4em',
    maxHeight: '4em',
    padding: 0,
    height: '4em'
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

    let cx = null
    if (selectedNetwork === null) {
      // TODO: add filter call here.
      cx = rawInteractions.originalCX
    } else {
      cx = externalNetworks.selectedNetwork.cx
    }

    console.log("POSTINGL", cx)

    cyrestApi.postNetwork(1234, cx)
  }

  return (
    <Tooltip title="Open in Cytoscape" placement="bottom">
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleImportNetwork}
      >
        <img alt="Cytoscape logo" src={logo} className={classes.icon} />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
