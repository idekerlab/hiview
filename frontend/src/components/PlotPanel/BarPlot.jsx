import React, { Component } from 'react'

import { XYPlot, XAxis, YAxis, HorizontalBarSeries } from 'react-vis'

const RANKING_MAX = 10

class BarPlot extends Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: -1,
      data: []
    }
  }

  componentDidMount() {}

  render() {
    // console.log('RENDERING!!')
    const dataPoints = this.props.data
    const { selectedIndex } = this.state

    // console.log(selectedIndex)

    const max =
      dataPoints.length < RANKING_MAX ? dataPoints.length : RANKING_MAX

    // Pick top 10 data
    const originalData = dataPoints.slice(0, max)

    const data = originalData.map((d, i) => ({
      y: d[1].split('_')[0],
      x: d[4],
      index: i
    }))

    // data.forEach(d => {
    //   if (selectedIndex === -1) {
    //     d.opacity = 1
    //   } else {
    //     if (d.index === selectedIndex) {
    //       d.opacity = 1
    //       d.color = 2
    //     } else {
    //       d.opacity = 0.2
    //     }
    //   }
    // })

    // console.log(data)

    return (
      <XYPlot
        colorType="category"
        onMouseLeave={() => this.setState({ selectedIndex: -1 })}
        animation={false}
        width={560}
        height={this.props.height}
        yType="ordinal"
        stackBy="x"
        margin={{ left: 250, right: 10, top: 3, bottom: 35 }}
      >
        <XAxis />
        <YAxis />

        <HorizontalBarSeries
          data={data}
          onValueClick={event =>
            this.handleBarSelection(event, this.props.title, dataPoints)
          }
          onValueMouseOut={(datapoint, event) =>
            this.setState({ selectedIndex: -1 })
          }
          onValueMouseOver={(datapoint, event) => {
            console.log(datapoint)
            this.setState({
              selectedIndex: datapoint.index
            })
          }}
        />
      </XYPlot>
    )
  }

  handleBarSelection = (event, title, dataPoints) => {
    console.log('CLICK BAR22!')
    event.title = title
    console.log(event)
    const genes = dataPoints[event.index][5]
    event.genes = genes
    this.setState({
      selectedIndex: event.index
    })
  }
}

export default BarPlot
