import React, { useRef, useEffect } from 'react'
import * as d3Selection from 'd3-selection'
import * as d3Shape from 'd3-shape'

const containerStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '1em',
  background: 'inherit',
}

const PleioEdge = () => {
  const legendRef = useRef(null)

  const legendFactory = () => {
    const curve = d3Shape.line().curve(d3Shape.curveNatural)

    const svg = d3Selection
      .select(legendRef.current)
      .attr('width', '100%')
      .attr('height', '100%')

    // Bounding box of this SVG
    const width = svg.node().getBoundingClientRect().width
    const height = svg.node().getBoundingClientRect().height

    const radius = height / 5
    const centerX = width / 2
    const centerY = height / 2
    const points = [
      [radius, radius],
      [centerX, centerY + height / 3],
      [width - radius, height - radius],
    ]

    svg
      .append('circle')
      .attr('cx', radius)
      .attr('cy', radius)
      .attr('r', radius)
      .style('fill', '#FFFFFF')
    svg
      .append('path')
      .attr('d', curve(points))
      .style('stroke-dasharray', '3, 5')
      .style('stroke-width', 3)
      .style('stroke', '#FFFFFF')
      .style('fill', 'none')
    svg
      .append('circle')
      .attr('cx', width - radius)
      .attr('cy', height - radius)
      .attr('r', radius)
      .style('fill', '#FFFFFF')
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

export default PleioEdge
