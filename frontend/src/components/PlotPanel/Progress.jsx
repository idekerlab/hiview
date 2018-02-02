import React from 'react'
import { LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'

const progressStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '50%'
}

const Progress = () => (
  <div style={progressStyle}>
    <Typography type="headline" component="h2">
      Running enrichment analysis...
    </Typography>

    <LinearProgress mode="query" style={{ width: '300px' }} />
  </div>
)

export default Progress
