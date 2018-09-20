import React, { Component } from 'react'
import { PrimaryFilter } from '../Filters'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis'

import Typography from 'material-ui/Typography'
import AllEdgeDistribution from './AllEdgeDistribution'

const PADDING_RIGHT = 10

class CrossFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      width: 0,

      lastDrawLocation: null
    }
  }

  componentDidMount() {
    const height = this.divElement.clientHeight
    const width = this.divElement.clientWidth
    this.setState({ height, width })
  }

  getTickCount = maxFrequency => {
    if (maxFrequency <= 1) {
      return 1
    } else {
      return 3
    }
  }

  render() {
    const data = this.props.networkData
    const allEdgeDist = data.allEdgeScoreDist
    const maxFrequency = data.maxFrequency
    const subEdgeDist = data.subEdgeScoreDist

    let showAllEdgeDist = false
    if (this.props.maxEdgeCount < this.props.originalEdgeCount) {
      showAllEdgeDist = true
    }

    const w = this.props.panelWidth
    const containerStyle = {
      background: '#FFFFFF',
      margin: 0,
      paddingBottom: '1.5em'
    }

    const titleStyle = {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }

    const tickTotal = this.getTickCount(maxFrequency)

    return (
      <div
        style={containerStyle}
        ref={divElement => (this.divElement = divElement)}
      >
        <XYPlot
          xType="ordinal"
          width={w}
          height={200}
          colorType="literal"
          style={{ margin: 0, padding: 0 }}
          margin={{ left: 40, right: 20, top: 10, bottom: 10 }}
        >
          <YAxis
            tickTotal={tickTotal}
            // tickFormat={v => {
            //   if (!v) {
            //     return '0'
            //   }
            //   return `${v.toFixed(5)}`
            // }}
          />
          <VerticalBarSeries
            className="vertical-bar-series-example"
            data={subEdgeDist}
          />
        </XYPlot>

        <div style={titleStyle}>
          <Typography
            variant="display1"
            style={{ color: '#444444', fontSize: '1em' }}
          >
            Integrated Similarity Score Distribution (for top 1000 edges)
          </Typography>
        </div>

        <PrimaryFilter
          filters={this.props.filters}
          commandActions={this.props.commandActions}
          commands={this.props.commands}
          filtersActions={this.props.filtersActions}
        />
      </div>
    )
  }
}

export default CrossFilter
