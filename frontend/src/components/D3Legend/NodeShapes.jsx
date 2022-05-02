import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import * as d3Selection from 'd3-selection'
import * as d3Array from 'd3-array'
import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'

// Default size of the root component
const DEF_WIDTH = '100%'
const DEF_HEIGHT = '1.5em'

const NodeShapes = ({ w, h }) => {
  let width = w
  if (w === undefined) {
    width = DEF_WIDTH
  }

  let height = h
  if (h === undefined) {
    height = DEF_HEIGHT
  }

  const containerStyle = {
    width: '100%',
    height: '3.5em',
    padding: 0,
  }

  const wrapper = {
    display: 'inline-flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const containerRef = useRef(null)
  const legendRef = useRef(null)

  /**
   * Create actual D3 element
   */
  const legendFactory = () => {
    const parentHeight = containerRef.current.offsetHeight
    const parentWidth = containerRef.current.offsetWidth
    const svg = d3Selection
      .select(legendRef.current)
      .attr('width', parentWidth)
      .attr('height', parentHeight)

    const PAD = 5
    const centerY = 20 + PAD

    svg
      .append('ellipse')
      .attr('cx', 40)
      .attr('cy', centerY)
      .attr('rx', 35)
      .attr('ry', 15)
      .style('stroke-width', 2)
      .style('stroke', '#666666') // set the line colour
      .style('fill', 'none')
    svg
      .append('rect')
      .attr('x', 250)
      .attr('y', PAD * 2)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('height', 30)
      .attr('width', 70)
      .style('stroke-width', 2)
      .style('stroke', '#666666')
      .style('fill', 'none')
    svg
      .append('text')
      .attr('x', 100)
      .attr('y', centerY)
      .text('Node Type A')
      .style('font-size', '1em')
      .attr('alignment-baseline', 'middle')
    svg
      .append('text')
      .attr('x', 350)
      .attr('y', centerY)
      .text('Node Type B')
      .style('font-size', '1em')
      .attr('alignment-baseline', 'middle')
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

  return (
    <div style={wrapper}>
      <div ref={containerRef} style={containerStyle}>
        <svg ref={legendRef} />
      </div>
    </div>
  )
}

NodeShapes.propTypes = {
  w: PropTypes.number,
  h: PropTypes.number,
}

export default NodeShapes
