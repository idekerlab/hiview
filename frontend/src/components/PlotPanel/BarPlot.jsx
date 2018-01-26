import React from 'react'

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalBarSeries
} from 'react-vis'

const RANKING_MAX = 15

const HOVER_COLOR = '#FF0000'


class BarPlot extends React.Component {
  constructor() {
    super();
    this.state = {
      index: null
    };
  }

  render() {
    const dataPoints = this.props.data
    const series = []

    const max = dataPoints.length < RANKING_MAX ? dataPoints.length : RANKING_MAX

    for (let i = max - 1; i > 0; i--) {
      const entry = dataPoints[i]
      const bar = {y: entry[1].split('_')[0], x: entry[4], index: i, color: i === this.state.index ? 0 : 1}
      series.push(bar)
    }

    return (
      <XYPlot
        colorType="category"
        onMouseLeave={() => this.setState({index: null})}
        animation={false}
        width={550}
        height={320}
        yType="ordinal"
        stackBy="x"
        margin={{left: 250, right: 10, top: 7, bottom: 35}}
      >
        {/*<VerticalGridLines />*/}

        {/*<HorizontalGridLines />*/}

        <XAxis/>
        <YAxis/>

        <HorizontalBarSeries
          data={series}
          onValueClick={(event) => this.handleBarSelection(event, this.props.title, dataPoints)}

          onValueMouseOver={(datapoint) => {

            if(this.state.index === datapoint.index) {
              return
            }

            console.log(datapoint)
            this.setState({
              index: datapoint.index
            })
          }}
        />
      </XYPlot>
    )
  }

  handleBarSelection = (event, title, dataPoints) => {
    console.log("CLICK BAR22!")
    event.title = title
    console.log(event)
    const genes = dataPoints[event.index][5]
    event.genes = genes

  }
}


export default BarPlot
