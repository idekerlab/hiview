import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const NotFoundPanel = () => (
  <React.Fragment>
    <Divider />
    <div style={{ padding: '1em' }}>
      <Typography variant="h5">Could not find any matches.</Typography>
      <Typography variant="subtitle1">
        Please try again with a different search term
      </Typography>
    </div>
  </React.Fragment>
)

export default NotFoundPanel
