import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'

import * as d3Selection from 'd3-selection'
import * as d3Array from 'd3-array'
import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

// Default size of the root component
const DEF_WIDTH = '100%'
const DEF_HEIGHT = '1.5em'

const rootStyle = {
  width: '100%',
  height: '100%',
  padding: '0.2em',
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

const D3Legend = ({ minScore=0.0, maxScore=1.0, w, h }) => {
  
  let width = w
  if (w === undefined) {
    width = DEF_WIDTH
  }

  let height = h
  if (h === undefined) {
    height = DEF_HEIGHT
  }

  const containerStyle = {
    width,
    height,
    padding: 0,
  }

  const containerRef = useRef(null)
  const legendRef = useRef(null)

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
    if (
      (containerRef !== null,
      containerRef !== undefined && legendRef !== undefined,
      legendRef !== null)
    ) {
      console.log('Ref initialized:', legendRef)

      legendFactory({ width, height })
    }
  }, [containerRef, legendRef])
  // const minRaw = networkProps['RF score min']
  // const maxRaw = networkProps['RF score max']

  // let min = 0
  // let max = 1
  // if (minRaw !== undefined) {
  //   min = Number(minRaw).toFixed(3)
  // }

  // if (minRaw !== undefined) {
  //   max = Number(maxRaw).toFixed(3)
  // }

  let min = Number(0).toFixed(2)
  // let min = Number(minScore).toFixed(2)
  let max = Number(maxScore).toFixed(2)

  return (
    <div style={rootStyle}>
      <div ref={containerRef} style={containerStyle}>
        <div style={barStyle}>
          <svg ref={legendRef} />
        </div>
      </div>
      <div style={textAreaStyle}>
        <Typography component="div">
          <Box fontSize={'1em'} fontWeight="fontWeightMedium" m={1}>
            {min}
          </Box>
        </Typography>
        <div style={captionStyle}>
          <Typography>
            <Box fontSize={'1em'} fontWeight="fontWeightMedium" m={1}>
              DDR protein Association Score (DAS)
            </Box>
          </Typography>
        </div>
        <Typography component="div">
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

const minMaxStyle = {
  display: 'inline-flex',
  width: '100%',
  alignItems: 'center',
  color: '#333333',
  justifyContent: 'center',
}

const minStyle = {
  width: '2em',
  paddingRight: '0.5em',
}

const maxStyle = {
  width: '2em',
  paddingLeft: '0.5em',
}

const titleStyle = {
  color: '#555555',
  fontFace: 'Roboto',
  fontSize: '0.7em',
  fontWeight: 400,
  padding: '0.3em',
}

export default D3Legend
