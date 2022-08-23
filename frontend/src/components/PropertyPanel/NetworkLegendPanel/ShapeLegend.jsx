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
    height: '6em',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    // border: '2px solid #F00',

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

const HEIGHT = 100
const TEXT_POSITION = 100

const ShapeLegend = ({ w = 500 }) => {
  const classes = useStyles()
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
    const centerY2 = centerY * 2 + PAD

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
      .append('text')
      .attr('x', TEXT_POSITION)
      .attr('y', centerY)
      .text('Pleiotropic')
      .style('font-size', '1em')
      .attr('alignment-baseline', 'middle')
    svg
      .append('rect')
      .attr('x', PAD)
      .attr('y', centerY2)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('height', 30)
      .attr('width', 70)
      .style('stroke-width', 2)
      .style('stroke', '#666666')
      .style('fill', 'none')
    svg
      .append('text')
      .attr('x', TEXT_POSITION)
      .attr('y', centerY2 + 20)
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
