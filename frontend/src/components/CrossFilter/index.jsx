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

import Typography from '@material-ui/core/Typography'
import AllEdgeDistribution from './AllEdgeDistribution'
import { min } from 'd3-array'

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

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //
  //   return true
  // }

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

  getRangeMap = (names, weights) => {
    const rangeMap = new Map()

    if (names.length !== weights.length) {
      console.warn('Error in weight data.')
      return rangeMap
    }

    names.forEach((name, idx) => {
      rangeMap.set(name, weights[idx])
    })

    return rangeMap
  }

  render() {
    // console.log('*** HIST:', this.props)
    const data = this.props.networkData
    if (
      !data ||
      Object.keys(data).length === 0 ||
      data.edgeScoreRange === undefined
    ) {
      return (
        <div
          style={containerStyle}
          ref={divElement => (this.divElement = divElement)}
        />
      )
    }

    let range = this.props.networkData.edgeScoreRange

    const maxFrequency = data.maxFrequency
    const subEdgeDist = data.subEdgeScoreDist

    if (data.maxFrequency === 0) {
      return (
        <div
          style={blankStyle}
          ref={divElement => (this.divElement = divElement)}
        />
      )
    }

    const w = this.props.panelWidth

    const tickTotal = this.getTickCount(maxFrequency)

    range = range.map(r => parseFloat(r))
    const weights = this.props.networkData['Children weight']
    const parent = this.props.networkData['Parent weight']

    const { filters } = this.props
    const primaryFilter = filters.filter(f => f.isPrimary)
    let realMin = 0.0
    let realMax = 1.0
    if (primaryFilter[0]) {
      realMin = primaryFilter[0].min
      realMax = primaryFilter[0].max
    } else {
      console.warn('Primary filter not available')
    }

    let marks

    if (weights) {
      marks = {}

      const minScore = range[0]
      const maxScore = range[1]

      const weightRange = weights.split('|').map(val => Number(val))
      const subsystems = this.props.networkData.Group
      const groupNames = subsystems.split('|')

      const rangeMap = this.getRangeMap(groupNames, weightRange)

      const weightSet = new Set(weightRange)
      const filteredWeights = [...weightSet].filter(
        w => w >= realMin && w <= realMax
      )
      const newWeights = [...filteredWeights].sort()
      const parentWeight = Number(parent)
      const scoreMap = {}

      groupNames.forEach((label, idx) => {
        const weight = weightRange[idx]
        let labels = scoreMap[weight]

        if (!labels) {
          labels = [label]
        } else {
          labels.push(label)
        }

        scoreMap[weight] = labels
      })

      marks[minScore] = {
        style: {
          wordWrap: 'break-word',
          color: '#333333',
          fontSize: '0.9em'
        },
        label: `${minScore.toFixed(3)}`
      }

      const baseStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        wordWrap: 'break-word',
        color: '#222222',
        fontWeight: 500,
        fontSize: '1.1em',
        marginTop: '-2.5em'
      }
      // const parentMark = {
      //   style: baseStyle,
      //   label: 'Parent'
      // }
      //
      // marks[parentWeight] = parentMark

      let flag = false
      let pad = 1.5

      newWeights.forEach((weight, idx) => {
        let position = 0
        if (flag) {
          position = -4.3
        }

        if (pad === 0) {
          pad = 1.5
        } else {
          pad = 0
        }
        position = position + 'em'
        flag = !flag

        const label =
          scoreMap[weight].length > 1
            ? scoreMap[weight][0] + ', ...'
            : scoreMap[weight][0]

        marks[weight] = {
          style: {
            wordWrap: 'break-word',
            color: '#222222',
            fontWeight: 500,
            fontSize: '1em',
            borderRadius: '0.5em',
            border: 'solid 1.5px #999999',
            padding: '0.5em',
            background: 'rgba(250, 250, 250, 0.5)',
            marginTop: position
          },
          label
        }
      })

      marks[maxScore] = {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          wordWrap: 'break-word',
          color: '#222222',
          fontWeight: 500,
          fontSize: '1em'
        },
        label: maxScore.toFixed(3)
      }
    }

    return (
      <div
        style={containerStyle}
        ref={divElement => (this.divElement = divElement)}
      >
        {/* <XYPlot
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
              line: { stroke: '#666666', strokeWidth: '2px' },
              ticks: { stroke: '#666666' },
              text: { stroke: 'none', fill: '#333333' },
              title: { stroke: '#222222', fontWeight: 300 }
            }}
            tickTotal={tickTotal}
          />
          <XAxis />
        </XYPlot> */}

        <PrimaryFilter
          filters={this.props.filters}
          commandActions={this.props.commandActions}
          commands={this.props.commands}
          filtersActions={this.props.filtersActions}
          marks={marks}
        />

        <div style={titleStyle}>
          <Typography
            variant="h4"
            style={{ color: '#444444', fontSize: '1.2em', paddingTop: '0.5em' }}
          >
            Similarity Score
          </Typography>
        </div>
      </div>
    )
  }
}

export default CrossFilter
