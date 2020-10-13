import React from 'react'
import Typography from '@material-ui/core/Typography'
import WarningIcon from '@material-ui/icons/ErrorOutline'

import PathPanel from './PathPanel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0.7em',
    margin: 0,
    background: '#222222',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 5000,
  },
  title: {
    color: '#EEEEEE',
    fontSize: '0.7em',
    borderBottom: '1px solid #EEEEEE',
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
  if (originalCount < maxCount) {
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

const MessageBar = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.title}>Data Viewer</div>
      <div className={classes.container}>{getWarning(props.originalEdgeCount, props.maxEdgeCount, classes)}</div>
      <PathPanel {...props} />
    </div>
  )
}

export default MessageBar
