import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'

import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import Button from '@material-ui/core/Button'

import ApplyIcon from '@material-ui/icons/Refresh'
import MenuItem from '@material-ui/core/MenuItem'

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
  const { classes, externalNetworks } = props

  const selected = externalNetworks.selectedNetworkName
  const selectedUuid = externalNetworks.selectedNetworkUuid

  const networkList = externalNetworks.externalNetworks

  const handleChange = name => event => {
    const newNetName = event.target.value
    props.externalNetworksActions.setExternalNetwork({name: newNetName, uuid: getUuid(newNetName)})

    fetchNet()
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

  const fetchNet = () => {
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
      getUuid(selected)
    )

  }

  const handleClick = event => {
    fetchNet()
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

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleClick}
        size="small"
      >
        <ApplyIcon className={classes.icon} />
      </Button>
    </div>
  )
}

export default withStyles(styles)(InteractionNetworkSelector)
