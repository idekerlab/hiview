import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'

import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import MenuItem from '@material-ui/core/MenuItem'

import OpenInCytoscapeButton from '../OpenInCytoscapeButton'
import TextField from '@material-ui/core/TextField'

// Base style
const styles = theme => ({
  root: {
    padding: '1em',
    color: '#333333',
    background: '#FFFFFF',
    boxSizing: 'border-box',
    width: '100%',
    border: '5px solid red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  formControl: {
    minWidth: '17em',
  },
  button: {
    margin: theme.spacing.unit
  },
  icon: {
    fontSize: '2em'
  }
})

const InteractionNetworkSelector = props => {
  const { classes, externalNetworks, ...others } = props

  const selected = externalNetworks.selectedNetworkName
  const networkList = externalNetworks.externalNetworks

  const handleChange = name => event => {
    const newNetName = event.target.value
    const interactomeUUID = getUuid(newNetName)
    props.externalNetworksActions.setExternalNetwork({
      name: newNetName,
      uuid: interactomeUUID
    })

    fetchNet(interactomeUUID)
  }

  const getUuid = selectedItem => {
    let len = networkList.length
    while (len--) {
      const entry = networkList[len]
      const name = entry.name
      if (name === selectedItem) {
        return entry.uuid
      }
    }

    return null
  }

  const fetchNet = interactomeUUID => {
    const subsystem = props.currentProperty.data
    const linkEntry = subsystem['ndex_internalLink']

    const pattern = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
    const matches = linkEntry.match(pattern)

    const uuid = matches[0]
    const locationParams = props.location
    let serverType = locationParams.query.type

    // Check size before
    const NDEX_API = '.ndexbio.org/v2/network/'
    const url = 'http://' + serverType + NDEX_API + uuid

    props.externalNetworksActions.fetchExternalNetworkFromUrl(
      url,
      uuid,
      interactomeUUID
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <FormControl className={classes.formControl}>
          <Select fullWidth={true} value={selected} onChange={handleChange()}>
            {networkList.map(net => {
              const name = net.name
              return (
                <MenuItem key={net.uuid} value={name}>
                  {name}
                </MenuItem>
              )
            })}
          </Select>
          <FormHelperText>External Networks</FormHelperText>
        </FormControl>

        <OpenInCytoscapeButton externalNetworks={externalNetworks} />
      </div>
      <TextField
        id="user-external-network"
        label="UUID of external network"
        value="test1"
        margin="normal"
        variant="outlined"
        fullWidth={true}
      />
    </div>
  )
}

export default withStyles(styles)(InteractionNetworkSelector)
