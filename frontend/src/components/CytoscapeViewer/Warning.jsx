import React from 'react'
import { Typography } from '@material-ui/core'

import './style.css'

const Warning = props => (
  <div className="warning-container">
    <div className="warning-message-box">
      <Typography variant="h6">
        Network is too big for interactive view
      </Typography>
      <Typography variant="subtitle1" />
    </div>
  </div>
)

export default Warning
