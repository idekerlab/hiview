import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'

import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import MenuItem from '@material-ui/core/MenuItem'

import OpenInCytoscapeButton from '../OpenInCytoscapeButton'

// Base style
const styles = theme => ({
  root: {
    color: '#333333',
    background: '#FFFFFF',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  formControl: {
    padding: '1em',
    minWidth: '17em',
    width: '100%'
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
      <FormControl className={classes.formControl}>
        <Select fullWidth value={selected} onChange={handleChange()}>
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
  )
}

export default withStyles(styles)(InteractionNetworkSelector)
