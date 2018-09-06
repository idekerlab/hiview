import React, { Component } from 'react'

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis'

import Highlight from './highlight'


const PADDING_RIGHT = 10


class CrossFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      width: 0,

      lastDrawLocation: null,
    }
  }

  componentDidMount() {
    const height = this.divElement.clientHeight
    const width = this.divElement.clientWidth
    this.setState({ height, width })
  }

  render() {

    const data = this.props.networkData
    const edgeDist = data.edgeScoreDist
    const subEdgeDist = data.subEdgeScoreDist

    const w = this.props.panelWidth
    const containerStyle = {
      background: '#FFFFFF',
      width: w,
      height: '30em'
    }

    return (
      <div
        style={containerStyle}
        ref={divElement => (this.divElement = divElement)}
      >
        <XYPlot
          xType="ordinal"
          width={w}
          height={(this.state.height / 3) * 2}
          colorType="literal"
        >
          <YAxis />
          <VerticalBarSeries
            className="vertical-bar-series-example"
            data={subEdgeDist}
          />
        </XYPlot>

        <XYPlot
          xType="ordinal"
          width={w}
          height={this.state.height / 3}
          color="#444444"
          margin={{left: 10, right: 10, top: 0, bottom: 5}}
        >
          <YAxis />
          <VerticalBarSeries
            className="vertical-bar-series-example"
            data={edgeDist}
          />

          <Highlight
            onBrushEnd={area => this.setState({ lastDrawLocation: area })}
            onDrag={area => {
              this.setState({
                lastDrawLocation: {
                  bottom:
                    this.state.lastDrawLocation.bottom +
                    (area.top - area.bottom),
                  left:
                    this.state.lastDrawLocation.left - (area.right - area.left),
                  right:
                    this.state.lastDrawLocation.right -
                    (area.right - area.left),
                  top:
                    this.state.lastDrawLocation.top + (area.top - area.bottom)
                }
              })
            }}
          />
        </XYPlot>
      </div>
    )
  }
}

export default CrossFilter
