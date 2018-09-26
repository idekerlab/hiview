import React, { Component } from 'react'
import { PrimaryFilter } from '../Filters'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  LabelSeries
} from 'react-vis'

import Typography from 'material-ui/Typography'
import AllEdgeDistribution from './AllEdgeDistribution'

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

  const
  render() {
    const data = this.props.networkData
    if (!data || Object.keys(data).length === 0) {
      return (
        <div
          style={containerStyle}
          ref={divElement => (this.divElement = divElement)}
        />
      )
    }

    const allEdgeDist = data.allEdgeScoreDist
    const maxFrequency = data.maxFrequency
    const subEdgeDist = data.subEdgeScoreDist

    let showAllEdgeDist = false
    if (this.props.maxEdgeCount < this.props.originalEdgeCount) {
      showAllEdgeDist = true
    }

    const w = this.props.panelWidth

    const tickTotal = this.getTickCount(maxFrequency)

    const range = this.props.networkData.edgeScoreRange
    const subsystems = this.props.networkData.Group

    const groupNames = subsystems.split('|')


    const weights = this.props.networkData['Children weight']

    let marks

    if(weights) {
      marks = {}

      const weightRange = weights.split('|').map(val => Number(val))

      marks[range[0]] = {
        style: {
          wordWrap: 'break-word',
          color: '#333333',
          fontSize: '0.9em'
        },
        label: `Parent (${range[0].toFixed(3)})`
      }


      weightRange.forEach((weight, idx) => {
        marks[weight] = {
          style: {
            transform: 'rotate(45deg)',
            wordWrap: 'break-word',
            color: '#444444',
            fontSize: '0.7em',
            paddingLeft: '3em'
          },
          label: `${groupNames[idx]} (${weight})`
        }
      })

      marks[range[1]] = {
        style: {
          wordWrap: 'break-word',
          color: '#333333',
          fontSize: '0.9em'
        },
        label: range[1].toFixed(3)
      }
    }
    return (
      <div
        style={containerStyle}
        ref={divElement => (this.divElement = divElement)}
      >
        <div style={titleStyle}>
          <Typography
            variant="display1"
            style={{ color: '#444444', fontSize: '1.2em',paddingTop: '0.5em' }}
          >
            Integrated Similarity Score Distribution
          </Typography>
        </div>
        <XYPlot
          xType="ordinal"
          width={w}
          height={200}
          colorType="literal"
          style={{ margin: 0, padding: 0 }}
          margin={{ left: 40, right: 20, top: 4, bottom: 8 }}
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

        <PrimaryFilter
          filters={this.props.filters}
          commandActions={this.props.commandActions}
          commands={this.props.commands}
          filtersActions={this.props.filtersActions}
          marks={marks}
        />
      </div>
    )
  }
}

export default CrossFilter
