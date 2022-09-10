import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import { EDGE_WIDTH } from '../StyleFactory'
import PleioEdge from './PleioEdge'
import SubEdgeTypes from './SubEdgeTypes'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'inherit',
    marginTop: theme.spacing(2),
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
  scoreCell: {
    color: '#444444',
    width: '2em',
    textAlign: 'center',
    margin: 'auto',
  },
  wrapper: {
    flexGrow: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(2),
  },
  edgeWidth: {
    backgroundColor: '#666666',
    width: '90%',
  },
  edgePleio: {
    backgroundColor: 'inherit',
    width: '90%',
  },
  pleioRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '4em',
    width: '100%',
    padding: 0,
    boxSizing: 'border-box',
    backgroundColor: '#AAAAAA',
  },
}))

const EdgeLegend = ({ legend }) => {
  const classes = useStyles()
  const scores = [0.0, 0.5, 1.0]
  const widths = [
    EDGE_WIDTH.min,
    (EDGE_WIDTH.max - EDGE_WIDTH.min) / 2,
    EDGE_WIDTH.max,
  ]
  return (
    <div className={classes.root}>
      
      <PleioEdge />
      
      <Typography className={classes.title} variant="h5">
        DAS Score to Edge Width
      </Typography>
      {scores.map((score, idx) => {
        const width = widths[idx]
        return (
          <div className={classes.row} key={score}>
            <div key={score} className={classes.scoreCell}>
              <Typography variant="body2">{score}</Typography>
            </div>
            <div className={classes.wrapper}>
              <div
                className={classes.edgeWidth}
                style={{ height: width * 2 }}
              />
            </div>
          </div>
        )
      })}

      <SubEdgeTypes />
      
    </div>
  )
}

export default EdgeLegend
