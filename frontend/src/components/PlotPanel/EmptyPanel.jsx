import React from 'react'
import Typography from '@material-ui/core/Typography'

const EmptyPanel = props => (
  <div style={props.style}>
    <Typography style={{ padding: '1em' }} variant={'h4'}>
      No enrichment result yet
    </Typography>
  </div>
)

export default EmptyPanel

