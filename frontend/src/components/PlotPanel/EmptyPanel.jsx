import React from 'react'
import Typography from 'material-ui/Typography'

const EmptyPanel = props => (
  <div style={props.style}>
    <Typography style={{ padding: '1em' }} variant={'display1'}>
      No enrichment result yet
    </Typography>
  </div>
)

export default EmptyPanel

