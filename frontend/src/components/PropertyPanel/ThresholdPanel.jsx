import React from 'react'
import { Typography } from '@material-ui/core'

import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      boxSizing: 'border-box',
      margin: 0,
      padding: theme.spacing(2),
      width: '100%',
      borderBottom: '1px solid #aaaaaa',
    },
  }),
)

const ThresholdPanel = ({ threshold }) => {
  const classes = useStyles()
  if (!threshold) {
    return null
  }

  return (
    <div className={classes.container}>
      <Typography variant="body1">
        Edges are only shown if they are above the threshold for the current
        assembly: {threshold}
      </Typography>
    </div>
  )
}

export default ThresholdPanel
