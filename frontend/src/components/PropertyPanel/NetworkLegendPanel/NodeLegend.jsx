import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import BaseNodeColors from './BaseNodeColors'
import { NODE_STYLE } from '../../../reducers/ui-state'
import ExtraNodeColors from './ExtraNodeColors'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'inherit',
  },
  title: {
    padding: theme.spacing(1),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '2em',
    width: '100%',
    padding: theme.spacing(1),
  },
  colorCell: {
    width: '2em',
    height: '2em',
  },
  label: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: theme.spacing(1),
  },
}))

const NodeLegend = ({ legend, nodeStyle }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5">
        {nodeStyle}
      </Typography>
      {nodeStyle === NODE_STYLE.MEMBERSHIP ? (
        <BaseNodeColors legend={legend} />
      ) : (
        <ExtraNodeColors legend={legend} nodeStyle={nodeStyle} />
      )}
    </div>
  )
}

export default NodeLegend
