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


  shouldComponentUpdate(nextProps, nextState) {
    const dataPoints = this.props.data
    const newDataPoints = nextProps.data

    if(dataPoints === newDataPoints) {
      return false
    }

    return true
  }

  render() {
    const dataPoints = this.props.data


    // Create label-value array
    const dataMap = new Map()

    dataPoints.forEach(data => {
      dataMap.set(data[1].split('_')[0], data[4])
    })

    const sorted = new Map([...dataMap.entries()].sort((a, b) => (a[1] - b[1])))


    const { selectedIndex } = this.state

    // Sort
    const max =
      dataPoints.length < RANKING_MAX ? dataPoints.length : RANKING_MAX

    // Pick top 10 data
    const originalData = [...sorted.entries()].slice(0, max)

    const data = originalData.map((d, i) => ({
      y: d[0],
      x: d[1],
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
        width={530}
        height={this.props.height}
        yType="ordinal"
        stackBy="x"
        margin={{ left: 330, right: 10, top: 0, bottom: 30 }}
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
            this.setState({
              selectedIndex: datapoint.index
            })
          }}
        />
      </XYPlot>
    )
  }

  handleBarSelection = (event, title, dataPoints) => {
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
