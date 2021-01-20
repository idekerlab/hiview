import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import logo from '../../assets/images/cytoscape-logo.svg'
import disabledLogo from '../../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import * as cyrestApi from '../../api/cyrest'

const styles = theme => ({
  button: {
    margin: '0.25em',
  },
  icon: {
    height: '2em',
  },
})

const OpenInCytoscapeButton = props => {
  const [isCytoscapeRunning, setRunning] = useState(false)

  const { classes, externalNetworks } = props
  let rawInteractions

  if (props.rawInteractions !== undefined) {
    rawInteractions = props.rawInteractions.toJS()
  } else {
    return (
      <Tooltip title="Open in Cytoscape Desktop" arrow placement="bottom">
        <span>
          <Button
            size="small"
            className={classes.button}
            color="default"
            variant="outlined"
            onClick={handleImportNetwork}
            disabled={true}
          >
            <img alt="Cytoscape logo" src={disabledLogo} className={classes.icon} />
          </Button>
        </span>
      </Tooltip>
    )
  }

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
  return (
    <Tooltip title="Open in Cytoscape Desktop" arrow placement="bottom">
      <span>
        <Button
          size="small"
          className={classes.button}
          color="default"
          variant="outlined"
          onClick={handleImportNetwork}
          disabled={!isCytoscapeRunning}
        >
          <img alt="Cytoscape logo" src={isCytoscapeRunning ? logo : disabledLogo} className={classes.icon} />
        </Button>
      </span>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
