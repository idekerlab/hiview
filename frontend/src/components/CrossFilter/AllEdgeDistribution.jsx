import React, { Component } from 'react'

import Highlight from './highlight'

import Typography from '@material-ui/core/Typography'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from 'react-vis'

const PADDING_RIGHT = 10

class AllEdgeDistribution extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      width: 0,
      lastDrawLocation: null
    }
  }

  render() {
    return (
      <div>
        <XYPlot
          xType="ordinal"
          margin={{ left: 40, right: 20, top: 0, bottom: 8 }}
          width={this.props.w}
          height={100}
          color="#777777"
        >
          <YAxis
            tickTotal={this.props.tickTotal}
            tickFormat={v => `${v.toFixed(0)}`}
          />
          <VerticalBarSeries
            className="vertical-bar-series-example"
            data={this.props.edgeDist}
          />

          {/*<Highlight*/}
          {/*onBrushEnd={area => this.setState({ lastDrawLocation: area })}*/}
          {/*onDrag={area => {*/}
          {/*this.setState({*/}
          {/*lastDrawLocation: {*/}
          {/*bottom:*/}
          {/*this.state.lastDrawLocation.bottom +*/}
          {/*(area.top - area.bottom),*/}
          {/*left:*/}
          {/*this.state.lastDrawLocation.left - (area.right - area.left),*/}
          {/*right:*/}
          {/*this.state.lastDrawLocation.right -*/}
          {/*(area.right - area.left),*/}
          {/*top:*/}
          {/*this.state.lastDrawLocation.top + (area.top - area.bottom)*/}
          {/*}*/}
          {/*})*/}
          {/*}}*/}
          {/*/>*/}
        </XYPlot>

        <div style={this.props.titleStyle}>
          <Typography
            variant="display1"
            style={{ color: '#666666', fontSize: '1em' }}
          >
            Integrated Similarity Score Distribution (for all edges)
          </Typography>
        </div>
      </div>
    )
  }
}

export default AllEdgeDistribution
