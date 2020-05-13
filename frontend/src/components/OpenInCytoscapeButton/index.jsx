import React, { useEffect, useState } from 'react'

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

    console.log('Sending CX', cx)

    cyrestApi.postNetwork(1234, cx)
  }

  return (
    <Tooltip title="Open in Cytoscape" placement="bottom">
      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleImportNetwork}
          disabled={!isCytoscapeRunning}
        >
          <img alt="Cytoscape logo" src={logo} className={classes.icon} />
        </Button>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
