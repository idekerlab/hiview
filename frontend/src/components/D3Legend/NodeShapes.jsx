import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as d3Selection from 'd3-selection'

// Default size of the root component

const containerStyle = {
  display: 'inline-flex',
  width: '100%',
  height: '3em',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
}

const HEIGHT = 48

const NodeShapes = ({ w }) => {
  const legendRef = useRef(null)

  /**
   * Create actual D3 element
   */
  const legendFactory = () => {
    const svg = d3Selection
      .select(legendRef.current)
      .attr('width', w)
      .attr('height', HEIGHT)

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
      .attr('x', 180)
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
      .attr('x', 85)
      .attr('y', centerY)
      .text('Pleiotropic')
      .style('font-size', '1em')
      .attr('alignment-baseline', 'middle')
    svg
      .append('text')
      .attr('x', 260)
      .attr('y', centerY)
      .text('Single assembly assignment')
      .style('font-size', '1em')
      .attr('alignment-baseline', 'middle')
  }

  useEffect(() => {
    if (legendRef !== undefined && legendRef !== null) {
      legendFactory()
    }
  }, [legendRef])

  return (
    <div style={containerStyle}>
      <svg ref={legendRef} />
    </div>
  )
}

NodeShapes.propTypes = {
  w: PropTypes.number,
  h: PropTypes.number,
}

export default NodeShapes
