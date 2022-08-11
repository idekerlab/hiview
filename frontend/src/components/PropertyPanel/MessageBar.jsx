import React from 'react'
import Typography from '@material-ui/core/Typography'
import WarningIcon from '@material-ui/icons/ErrorOutline'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/InfoOutlined'

import PathPanel from './PathPanel'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0.7em',
    margin: 0,
    background: '#222222',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1300,
  },
  titleContainer: {
  },
  title: {
    color: '#EEEEEE',
    fontSize: '0.7em',
    borderBottom: '1px solid #EEEEEE',
  },
  infoButton: {
    color: '#EEEEEE',
  },
  container: {
    paddingTop: '0.7em',
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningPanel: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  warning: {
    color: '#FFFFFF',
    fontSize: '0.8em',
  },
  warningIcon: {
    color: 'red',
    height: '1em',
    width: '1em',
    paddingRight: '0.5em',
  },
}))

const getWarning = (originalCount, maxCount, classes) => {
  if (originalCount <= maxCount) {
    return <div />
  } else {
    return (
      <div className={classes.warningPanel}>
        <WarningIcon className={classes.warningIcon} />
        <Typography variant="h4" className={classes.warning}>
          Showing top {maxCount} interactions out of {originalCount}
        </Typography>
      </div>
    )
  }
}

const MessageBar = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.titleContainer}
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={11}>
          <Typography className={classes.title}>Data Viewer</Typography>
        </Grid>
        <Grid item className={classes.infoButton} xs={1}>
          <IconButton color={'secondary'}>
            <InfoIcon />
          </IconButton>
        </Grid>
      </Grid>
      <div className={classes.container}>
        {getWarning(props.originalEdgeCount, props.maxEdgeCount, classes)}
      </div>
      <PathPanel {...props} />
    </div>
  )
}

export default MessageBar
