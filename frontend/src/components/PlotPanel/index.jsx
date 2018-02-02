import React from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import style from './style.css'

import BarPlot from './BarPlot'

import { LinearProgress } from 'material-ui/Progress'

const PlotPanel = props => {
  const containerStyle = {
    height: props.height,
    width: props.width,

    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }

  const loading = props.enrichment.running

  if (loading) {
    return progress()
  } else if (props.data === null) {
    return progress()
    // return <div />
  } else {
    return <div style={containerStyle}>{plots(props)}</div>
  }
}

const progress = () => {
  const progressStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }

  return (
    <div style={progressStyle}>
      <LinearProgress mode="query" style={{ width: '300px' }} />
    </div>
  )
}

const plots = props => {
  const plotList = []

  for (let [k, v] of Object.entries(props.data)) {
    plotList.push(
      <Paper className={style.plotContainer} elevation={4} key={k}>
        <Typography type="headline" component="h3">
          {k}
        </Typography>
        <BarPlot data={v} title={k} />
      </Paper>
    )
  }

  return plotList
}

export default PlotPanel
