import React from 'react'

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries
} from 'react-vis'

const RANKING_MAX = 10


const BarPlot = props => {
  const dataPoints = props.data
  const series = []

  for (let i = RANKING_MAX-1; i > 0; i--) {
    const entry = dataPoints[i]
    // entry.forEach(d => {
    //   console.log(d)
    // })
    const bar = { y: entry[1].split('_')[0], x: entry[4] }
    series.push(bar)
  }

  return (

    <XYPlot
      animation={true}
      width={550}
      height={300}
      yType="ordinal"
      stackBy="x"
      margin={{left: 250, right: 10, top: 7, bottom: 35}}
    >
      {/*<VerticalGridLines />*/}

      {/*<HorizontalGridLines />*/}

      <XAxis />
      <YAxis />

      <HorizontalBarSeries data={series} />
    </XYPlot>
  )
}

export default BarPlot
