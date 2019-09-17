import React from 'react'
import Typography from '@material-ui/core/Typography'

const DEF_MESSAGE = 'No enrichment result'

const EmptyPanel = props => (
  <div style={props.style}>
    <Typography style={{ padding: '1em' }} variant={'h4'}>
      {!props.message ? DEF_MESSAGE : props.message}
    </Typography>
  </div>
)

export default EmptyPanel
