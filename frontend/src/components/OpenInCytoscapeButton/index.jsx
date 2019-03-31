import React from 'react'

import Button from '@material-ui/core/Button'
import logo from '../../assets/images/cytoscape-logo.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'


import * as cyrestApi from '../../api/cyrest'

const styles = theme => ({
  buttonIcon: {
    height: '2.5em'
  }
})

const OpenInCytoscapeButton = props => {
  const { classes, externalNetworks } = props

  console.log('--------------=====================Button', props)

  const handleImportNetwork = () => {
    console.log('Started: OpenInButton props', props)
    cyrestApi.postNetwork(1234, externalNetworks.selectedNetwork.cx)
  }

  return (
    <Tooltip title="Open in Cytoscape" placement="bottom">
      <Button
        variant="contained"
        color="default"
        // disabled={!uiState.isCytoscapeRunning}
        onClick={handleImportNetwork}
      >
        <img alt="Cytoscape logo" src={logo} className={classes.buttonIcon} />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
