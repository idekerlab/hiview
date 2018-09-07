import React, { Component } from 'react'

import LegendPanel from '../PropertyPanel/LegendPanel'
import { PrimaryFilter } from '../Filters'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  ContinuousColorLegend
} from 'react-vis'

import Highlight from './highlight'

import Typography from 'material-ui/Typography'

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

  numberFormatter = (value, index, scale, tickTotal) =>
    `${scale.tickFormat(tickTotal, 's')(value.toFixed(0))}`

  getTickCount = maxFrequency => {
    if (maxFrequency <= 1) {
      return 1
    } else {
      return 3
    }
  }

  render() {
    const data = this.props.networkData
    const edgeDist = data.edgeScoreDist
    const maxFrequency = data.maxFrequency
    const subEdgeDist = data.subEdgeScoreDist

    const w = this.props.panelWidth
    const containerStyle = {
      background: '#FFFFFF',
      margin: 0,
      padding: 0
    }

    const titleStyle = {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }

    return (
      <div
        style={containerStyle}
        ref={divElement => (this.divElement = divElement)}
      >
        {/*<LegendPanel networkProps={this.props.networkProps} />*/}

        <XYPlot
          xType="ordinal"
          width={w}
          height={200}
          colorType="literal"
          style={{ margin: 0, padding: 0 }}
          margin={{ left: 40, right: 20, top: 10, bottom: 10 }}
        >
          <YAxis
            tickTotal={this.getTickCount(maxFrequency)}
            tickFormat={v => `${v.toFixed(0)}`}
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

        <XYPlot
          xType="ordinal"
          margin={{ left: 40, right: 20, top: 0, bottom: 8 }}
          width={w}
          height={100}
          color="#777777"
        >
          <YAxis
            tickTotal={this.getTickCount(maxFrequency)}
            tickFormat={v => `${v.toFixed(0)}`}
          />
          <VerticalBarSeries
            className="vertical-bar-series-example"
            data={edgeDist}
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

        <div style={titleStyle}>
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

export default CrossFilter
