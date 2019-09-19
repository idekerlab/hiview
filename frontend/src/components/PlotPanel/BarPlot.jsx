import React, { Component } from 'react'
import { Map, List } from 'immutable'

import EmptyPanel from './EmptyPanel'

import { XYPlot, XAxis, YAxis, HorizontalBarSeries } from 'react-vis'

const RANKING_MAX = 10
const ADJ_PVAL_IDX = 6
const FONT_SIZE = 6.5

class BarPlot extends Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: -1
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const dataPoints = this.props.data
    const newDataPoints = nextProps.data

    if (dataPoints === newDataPoints) {
      return false
    }

    return true
  }

  render() {
    const dataPoints = this.props.data

    if (
      dataPoints === null ||
      dataPoints === undefined ||
      dataPoints.length === 0
    ) {
      return <EmptyPanel />
    }

    // Create label-value array
    const dataMap = {}

    dataPoints.forEach(data => {
      dataMap[data[1].split('_')[0]] = data[ADJ_PVAL_IDX]
    })

    const sorted = Map(dataMap).sort((f1, f2) => {
      const a = parseFloat(f1)
      const b = parseFloat(f2)

      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      if (a === b) {
        return 0
      }
    })

    // Sort
    const max =
      dataPoints.length < RANKING_MAX ? dataPoints.length : RANKING_MAX

    // Pick top n (default = 10) data
    const originalData = [...sorted.entries()].slice(0, max)

    let dataLen = originalData.length

    let isEmpty = true
    while (dataLen--) {
      if (originalData[dataLen][1] < 0.05) {
        isEmpty = false
        break
      }
    }

    if (isEmpty) {
      return (
        <EmptyPanel message={'No significant annotations found (p-val>0.05)'} />
      )
    }

    let maxTextLength = 0

    const data = originalData.map((d, i) => {
      const text = d[0]
      if (text.length > maxTextLength) {
        maxTextLength = text.length
      }

      return {
        y: d[0],
        x: -Math.log10(d[1]),
        index: i
      }
    })

    const reversed = List([...data])
      .reverse()
      .toJS()

    const leftWidth = FONT_SIZE * maxTextLength + 20
    const panelWidth = leftWidth + 500

    return (
      <div>
        <XYPlot
          colorType="category"
          onMouseLeave={() => this.setState({ selectedIndex: -1 })}
          animation={true}
          width={panelWidth}
          height={this.props.height}
          yType="ordinal"
          stackBy="x"
          margin={{ left: leftWidth, right: 10, top: 0, bottom: 50 }}
        >
          <XAxis title={'Adjusted p-value (-log10)'} position={'middle'} />
          <YAxis />

          <HorizontalBarSeries
            data={reversed}
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
      </div>
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
