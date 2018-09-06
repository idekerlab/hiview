import React from 'react'

import { blueGrey } from 'material-ui/colors'

const style = {
  background: blueGrey[50],
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const BlankPanel = props => (
  <div style={style}>
    <h1>Subsystem Not Selected</h1>
  </div>
)

export default BlankPanel
