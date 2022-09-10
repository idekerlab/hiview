import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import * as d3Selection from 'd3-selection'
import * as d3Shape from 'd3-shape'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginTop: theme.spacing(2),
  },
  container: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '1em',
    background: 'inherit',
  },
  title: {
    color: '#222222',
    padding: theme.spacing(1),
  },
  edgePleio: {
    backgroundColor: 'inherit',
    width: '90%',
  },
  pleioRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '4em',
    width: '100%',
    padding: 0,
    boxSizing: 'border-box',
  },
}))

const PleioEdge = () => {
  const classes = useStyles()
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
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5">
        Edges connecting same pleiotropic genes
      </Typography>
      <div className={classes.pleioRow}>
        <div className={classes.container}>
          <svg ref={legendRef} />
        </div>
      </div>
    </div>
  )
}

export default PleioEdge
