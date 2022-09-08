import React, { useRef, useEffect } from 'react'
import * as d3Selection from 'd3-selection'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

// Default size of the root component

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 0,
  },
  container: {
    backgroundColor: 'inherit',
    display: 'inline-flex',
    width: '100%',
    height: '5em',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(1)
  },
  title: {
    padding: theme.spacing(1),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '2em',
    width: '100%',
    padding: theme.spacing(1),
  },
  scoreCell: {
    color: '#444444',
    width: '2em',
    textAlign: 'center',
    margin: 'auto',
  },
  wrapper: {
    flexGrow: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(2),
  },
  edgeWidth: {
    backgroundColor: '#666666',
    width: '90%',
  },
}))

const ShapeLegend = () => {
  const classes = useStyles()
  const legendRef = useRef(null)

  /**
   * Create actual D3 element
   */
  const legendFactory = () => {
    const svg = d3Selection
      .select(legendRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
    
    // Bounding box of this SVG
    const width = svg.node().getBoundingClientRect().width
    const height = svg.node().getBoundingClientRect().height

    const space = width * 0.05
    const centerX = width / 2
    const centerY = height / 2

    const shapeWidth = width * 0.15
    const shapeHeight = (height / 2) * 0.8 
    svg
      .append('rect')
      .attr('x', 1)
      .attr('y', 1)
      .attr('height', shapeHeight)
      .attr('width', shapeWidth)
      .style('stroke', '#555555')
      .style('stroke-width', 2)
      .style('fill', 'none')
    svg
      .append('text')
      .attr('x', shapeWidth + space)
      .attr('y', centerY - centerY / 2)
      .text('Single assembly assignment')
      .style('font-size', '1.2em')
      .attr('alignment-baseline', 'middle')
    svg
      .append('ellipse')
      .attr('cx', shapeWidth/2 + 1)
      .attr('cy', centerY + centerY/2)
      .attr('rx', shapeWidth/2)
      .attr('ry', shapeHeight/2)
      .style('stroke-width', 2)
      .style('stroke', '#555555')
      .style('fill', 'none')
    svg
      .append('text')
      .attr('x', shapeWidth + space)
      .attr('y', centerY + centerY/2)
      .text('Pleiotropic')
      .style('font-size', '1.2em')
      .attr('alignment-baseline', 'middle')
  }

  useEffect(() => {
    if (legendRef !== undefined && legendRef !== null) {
      legendFactory()
    }
  }, [legendRef])

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5">
        Gene Types
      </Typography>
      <div className={classes.container}>
        <svg ref={legendRef} />
      </div>
    </div>
  )
}

export default ShapeLegend
