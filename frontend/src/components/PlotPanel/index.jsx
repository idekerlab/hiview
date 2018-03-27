import React from 'react'
import Typography from 'material-ui/Typography'
import style from './style.css'

import BarPlot from './BarPlot'
import Progress from './Progress'

const PlotPanel = props => {
  const containerStyle = {
    height: '100%',

    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }

  const loading = props.enrichment.get('running')
  if (loading) {
    return <Progress />
  } else if (props.data === null) {
    return <div />
  } else {
    return <div style={containerStyle}>{plots(props)}</div>
  }
}

const plots = props => {
  const plotList = []

  for (let [k, v] of Object.entries(props.data)) {
    plotList.push(
      <div className={style.plotContainer} key={k}>
        <Typography type="headline" component="h3">
          {k}
        </Typography>
        <BarPlot height={300} data={v} title={k} />
      </div>
    )
  }

  return plotList
}

export default PlotPanel
