import React, { useState, Fragment } from 'react'
import {Button, Tooltip, Typography} from '@material-ui/core'
import WarningIcon from '@material-ui/icons/ErrorOutline'
import InfoIcon from '@material-ui/icons/ExpandMoreOutlined'
import { makeStyles } from '@material-ui/core/styles'

import PathPanel from './PathPanel'
import NetworkLegendPanel from './NetworkLegendPanel'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingTop: 0,
    margin: 0,
    background: '#222222',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1300,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoIcon: {
    color: '#EEEEEE',
    width: '1em',
    height: '1em',
  },
  legendButton: {
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    margin: 0,
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
const TOOLTIP_TEXT = 'Show a legend of the current network.'

const MessageBar = (props) => {
  const classes = useStyles()
  const { legend } = props

  const [showLegend, setShowLegend] = useState(false)

  const handleInfoClick = () => {
    setShowLegend(!showLegend)
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.container}>
          {getWarning(props.originalEdgeCount, props.maxEdgeCount, classes)}
        </div>
        <div className={classes.row}>
          <PathPanel {...props} />

          <Tooltip
            arrow
            title={
              <Typography variant={'body1'}>
                {TOOLTIP_TEXT}
              </Typography>
            }
          >
            <Button
              variant="outlined"
              size="small"
              className={classes.legendButton}
              startIcon={<InfoIcon />}
              onClick={handleInfoClick}
            >
              Legend
            </Button>
          </Tooltip>
        </div>
      </div>
      <NetworkLegendPanel
        legend={legend}
        showLegend={showLegend}
        setShowLegend={setShowLegend}
      />
    </Fragment>
  )
}

export default MessageBar
