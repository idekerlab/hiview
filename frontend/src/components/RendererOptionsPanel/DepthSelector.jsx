import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const DEPTH_RANGE = [...Array(10).keys()]

const DepthSelector = props => {
  const [selected, setSelected] = useState(0)

  const handleChange = event => {
    const value = event.target.value
    setSelected(value)

    props.uiStateActions.setDefaultDepth(value + 1)
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>D</Avatar>
      </ListItemAvatar>

      <ListItemText primary="Default Expansion Depth:" />
      <Select
        value={selected}
        style={{ width: '55%' }}
        onChange={handleChange}
      >
        {DEPTH_RANGE.map(index => (
          <MenuItem key={index} value={index}>
            {'From root to depth ' + (index + 1)}
          </MenuItem>
        ))}
      </Select>
    </ListItem>
  )
}

export default DepthSelector
