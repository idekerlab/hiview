import React from 'react'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress: {
    padding: '0.3em'
  }
})

const LoadingPanel = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress size={'3em'} className={classes.progress} />
      <Typography variant={'subtitle1'}>{props.message}</Typography>
    </div>
  )
}

export default LoadingPanel
