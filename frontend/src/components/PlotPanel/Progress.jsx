import React from 'react'
import { LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'

const Progress = props => (
  <div style={props.style}>
    <Typography style={{ padding: '1em' }} variant={'display1'}>
      Running enrichment analysis...
    </Typography>
    <LinearProgress mode="query" style={{ width: '30%' }} />
  </div>
)

export default Progress
