import React from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import style from './style.css'

import BarPlot from './BarPlot'

const PlotPanel = props => {

  console.log("WIDTH==========> " + props.width)

  const containerStyle = {
    height: '100%',
    width: props.width,
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
  return props.data === null ? (
    <div />
  ) : (
    <div style={containerStyle}>{plots(props)}</div>
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
