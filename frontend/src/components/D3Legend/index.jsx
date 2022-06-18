import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'

import * as d3Selection from 'd3-selection'
import * as d3Array from 'd3-array'
import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import NodeShapes from './NodeShapes'

// Default size of the root component
const DEF_WIDTH = 0
const DEF_HEIGHT = '1.5em'

const rootStyle = {
  width: '100%',
  height: '100%',
  padding: '0',
  background: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 0,
}

const textAreaStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  padding: 0,
}

const captionStyle = {
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const D3Legend = ({ minScore = 0.0, maxScore = 1.0, w=DEF_WIDTH, h=DEF_HEIGHT }) => {
  let width = w
  let height = h

  const containerStyle = {
    width,
    height,
    padding: 0,
  }

  const containerRef = useRef(null)
  const legendRef = useRef(null)

  const [wrapperWidth, setWrapperWidth] = useState(DEF_WIDTH)

  /**
   * Create actual D3 element
   */
  const legendFactory = ({ width, height }) => {
    const parentHeight = containerRef.current.offsetHeight
    const parentWidth = containerRef.current.offsetWidth

    const legendRedSelected = d3Selection.select(legendRef.current)

    const svg = legendRedSelected
      .attr('width', parentWidth)
      .attr('height', parentHeight)
      .append('g')

    const colorScale = d3Scale
      .scaleSequential(d3ScaleChromatic.interpolateInferno)
      .domain([0, parentWidth])

    const bars = svg
      .selectAll('.bars')
      .data(d3Array.range(parentWidth), function (d) {
        return d
      })
      .enter()
      .append('rect')
      .attr('class', 'bars')
      .attr('x', function (d, i) {
        return i
      })
      .attr('y', 0)
      .attr('height', parentHeight)
      .attr('width', 2)
      .attr('stroke', 0)
      .style('fill', function (d, i) {
        return colorScale(d)
      })
  }

  useEffect(() => {
    legendFactory({ width: w, height: h })
    setWrapperWidth(w)
  }, [w, h])

  useEffect(() => {
    if (
      (containerRef !== null,
      containerRef !== undefined && legendRef !== undefined,
      legendRef !== null)
    ) {
      legendFactory({ width, height })
    }
  }, [containerRef, legendRef])

  let min = Number(0).toFixed(2)
  let max = Number(maxScore).toFixed(2)

  return (
    <div style={rootStyle}>
      <NodeShapes w={wrapperWidth} />
      <div ref={containerRef} style={containerStyle}>
        <div style={barStyle}>
          <svg ref={legendRef} />
        </div>
      </div>
      <div style={textAreaStyle}>
        <Typography component='span'>
          <Box fontSize={'1em'} fontWeight="fontWeightMedium" m={1}>
            {min}
          </Box>
        </Typography>
        <div style={captionStyle}>
          <Typography component={'span'}>
            <Box fontSize={'1em'} fontWeight="fontWeightMedium" m={1}>
              DDR protein Association Score (DAS)
            </Box>
          </Typography>
        </div>
        <Typography component='span'>
          <Box fontSize={'1em'} fontWeight="fontWeightMedium" m={1}>
            {max}
          </Box>
        </Typography>
      </div>
    </div>
  )
}

D3Legend.propTypes = {
  minScore: PropTypes.number,
  maxScore: PropTypes.number,
  w: PropTypes.number,
  h: PropTypes.number,
}

const barStyle = {
  display: 'inline-flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}

export default D3Legend
