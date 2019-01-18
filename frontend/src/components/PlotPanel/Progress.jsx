import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography'

const Progress = props => (
  <div style={props.style}>
    <Typography style={{ padding: '1em' }} variant={'h4'}>
      Running enrichment analysis...
    </Typography>
    <LinearProgress mode="query" style={{ width: '30%' }} />
  </div>
)

export default Progress
