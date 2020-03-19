import React from 'react'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const NotFoundPanel = () => (
  <div>
    <Divider />
    <CardActions>
      <Typography variant="h5">Not Found!</Typography>
    </CardActions>
  </div>
)

export default NotFoundPanel
