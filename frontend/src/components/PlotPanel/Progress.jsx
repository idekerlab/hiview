import React from 'react'
import { LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'

const progressStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%'
}

const Progress = () => (
  <div style={progressStyle}>
    <Typography style={{ padding: '1em' }} variant={'display1'}>Running enrichment analysis...</Typography>

    <LinearProgress mode="query" style={{ width: '300px' }} />
  </div>
)

export default Progress
