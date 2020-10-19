import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import logo from '../../assets/images/cytoscape-logo.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import * as cyrestApi from '../../api/cyrest'

const styles = theme => ({
  button: {
    marginLeft: '0.5em',
  },
  icon: {
    height: '2em',
  },
})

const OpenInCytoscapeButton = props => {
  const [isCytoscapeRunning, setRunning] = useState(false)

  const { classes, externalNetworks, rawInteractions } = props

  useEffect(() => {
    // Check connection
    try {
      cyrestApi
        .checkStatus(1234)
        .then(res => {
          if (res.status === 200) {
            setRunning(true)
          } else {
            setRunning(false)
            throw new Error('Not running')
          }
          return res.json()
        })
        .catch(e => {
          setRunning(false)
        })
    } catch (e) {
      setRunning(false)
    }
  }, [rawInteractions.originalCX])

  const handleImportNetwork = () => {
    const selectedNetwork = externalNetworks.selectedNetwork

    let cx = null
    if (selectedNetwork === null) {
      // TODO: add filter call here.
      cx = rawInteractions.originalCX
    } else {
      cx = externalNetworks.selectedNetwork.cx
    }

    cyrestApi.postNetwork(1234, cx)
  }

  if(!isCytoscapeRunning) {
    return <div />
  }

  return (
    <Tooltip title="Open in Cytoscape Desktop" arrow placement="bottom">
      <Button
        size="small"
        className={classes.button}
        color="default"
        variant="outlined"
        onClick={handleImportNetwork}
        disabled={!isCytoscapeRunning}
      >
        <img alt="Cytoscape logo" src={logo} className={classes.icon} />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
