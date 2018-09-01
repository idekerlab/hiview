import React, { Component } from 'react'

import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Button from 'material-ui/Button'
import ApplyIcon from 'material-ui-icons/Refresh'
import FitContent from 'material-ui-icons/ZoomOutMap'
import FitSelected from 'material-ui-icons/CenterFocusStrong'

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis'

import Highlight from './highlight'

const containerStyle = {
  background: '#FFFFFF',
  width: '100%',
  height: '30em'
}

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
    console.log('CF data: ', edgeDist, subEdgeDist)

    return (
      <div
        style={containerStyle}
        ref={divElement => (this.divElement = divElement)}
      >
        <XYPlot
          xType="ordinal"
          width={this.state.width}
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
          width={this.state.width}
          height={this.state.height / 3}
          color="#444444"
          margin={{left: 0, right: 0, top: 10, bottom: 5}}
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
