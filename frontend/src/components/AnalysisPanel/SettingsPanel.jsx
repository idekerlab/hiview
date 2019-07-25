import React from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'


const SettingsPanel = props => (
  <div style={props.style}>
    <IconButton style={{width: '1.4em', height: '1.4em', color: '#333333'}}>
      <SettingsIcon />
    </IconButton>
  </div>
)

export default SettingsPanel
