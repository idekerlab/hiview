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

const blankStyle = {
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

    if(data.maxFrequency === 0) {
      return (
        <div
          style={blankStyle}
          ref={divElement => (this.divElement = divElement)}
        />
      )
    }

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
    const parent = this.props.networkData['Parent weight']

    let marks

    if(weights) {
      marks = {}

      const weightRange = weights.split('|').map(val => Number(val))

      const weightSet = new Set(weightRange)
      const newWeights = [...weightSet].sort()

      const parentWeight = Number(parent)

      const scoreMap = {}

      groupNames.forEach((label, idx) => {
        const weight = weightRange[idx]
        let labels = scoreMap[weight]

        if(!labels) {
          labels = [label]
        } else {
          labels.push(label)
        }

        scoreMap[weight] = labels
      })

      marks[range[0]] = {
        style: {
          wordWrap: 'break-word',
          color: '#333333',
          fontSize: '0.9em'
        },
        label: `${range[0].toFixed(3)}`
      }

      const baseStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        wordWrap: 'break-word',
        color: '#222222',
        fontWeight: 500,
        fontSize: '1.1em',
        // marginBottom: '200px',
        marginTop: '-2.5em'
        // borderRadius: '0.5em',
        // border: 'solid 1px #777777',
        // padding: '1em'
      }
      const parentMark = {
        style: baseStyle,
        label: 'Parent'
      }


      marks[parentWeight] = parentMark


      let flag = false

      let pad = 1.5

      newWeights.forEach((weight, idx) => {

        let position = 0
        if(flag) {
          position = -4.3
        }

        if(pad === 0) {
          pad = 1.5
        } else {
          pad = 0
        }
        position = position + 'em'
        flag = !flag

        marks[weight] = {
          style: {
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
            wordWrap: 'break-word',
            color: '#222222',
            fontWeight: 500,
            fontSize: '1em',
            // width: '5em',
            // height: '5em',
            borderRadius: '0.5em',
            border: 'solid 1.5px #999999',
            padding: '0.5em',
            background: 'rgba(250, 250, 250, 0.5)',
            marginTop: position

          },
          label: scoreMap[weight].reduce((l1, l2) => { return (l1 + ', ' + l2)})
        }

      })

      marks[range[1]] = {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          wordWrap: 'break-word',
          color: '#222222',
          fontWeight: 500,
          fontSize: '1em'
        },
        label: range[1].toFixed(3)
      }
    }
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
          margin={{ left: 40, right: 20, top: 8, bottom: 8 }}
        >
          <VerticalBarSeries
            className="vertical-bar-series"
            data={subEdgeDist}
          />

          <YAxis
            title={'Gene Pairs (log10)'}
            position={'middle'}
            style={{
              line: {stroke: '#666666', strokeWidth: '2px'},
              ticks: {stroke: '#666666'},
              text: {stroke: 'none', fill: '#333333'},
              title: {stroke: '#222222', fontWeight: 300 }
            }}
            tickTotal={tickTotal}
          />
          <XAxis />
        </XYPlot>

        <PrimaryFilter
          filters={this.props.filters}
          commandActions={this.props.commandActions}
          commands={this.props.commands}
          filtersActions={this.props.filtersActions}
          marks={marks}
        />

        <div style={titleStyle}>
          <Typography
            variant="display1"
            style={{ color: '#444444', fontSize: '1.2em',paddingTop: '0.5em' }}
          >
            Similarity Score
          </Typography>
        </div>
      </div>
    )
  }
}

export default CrossFilter
