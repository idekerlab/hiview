import React, { Component } from 'react'
import * as d3Selection from 'd3-selection'
import * as d3Array from 'd3-array'
import * as d3Scale from 'd3-scale'

const legendPanelStyle = {
  display: 'flex',
  flexDirection: 'column',
  color: '#444444',
  background: '#FFFFFF',
  padding: 0,
  paddingLeft: 30,
  paddingRight: 30
}

const BAR_HEIGHT = 20

class LegendPanel extends Component {
  componentDidMount() {
    const svgLegend = this.legend
    const parentWidth = this.container.parentNode.clientWidth

    const svg = d3Selection
      .select(svgLegend)
      .attr('width', parentWidth)
      .attr('height', BAR_HEIGHT)
      .append('g')

    const colorScale = d3Scale
      .scaleSequential(d3Scale.interpolateInferno)
      .domain([0, parentWidth])

    const bars = svg
      .selectAll('.bars')
      .data(d3Array.range(parentWidth), function(d) {
        return d
      })
      .enter()
      .append('rect')
      .attr('class', 'bars')
      .attr('x', function(d, i) {
        return i
      })
      .attr('y', 0)
      .attr('height', BAR_HEIGHT)
      .attr('width', 2)
      .attr('stroke', 0)
      .style('fill', function(d, i) {
        return colorScale(d)
      })
  }

  render() {

    console.log('LEGEND prop: ', this.props)
    const minRaw = this.props.networkProps['RF score min']
    const maxRaw = this.props.networkProps['RF score max']

    let min = 0
    let max = 1
    if (minRaw !== undefined) {
      min = Number(minRaw).toFixed(3)
    }

    if (minRaw !== undefined) {
      max = Number(maxRaw).toFixed(3)
    }

    return (
      <div
        ref={container => (this.container = container)}
        style={legendPanelStyle}
      >

        {/*<div style={minMaxStyle}>*/}
          {/*<div>1</div>*/}
          {/*<div style={titleStyle}>Integrated Similarity Score</div>*/}
          {/*<div>2</div>*/}
        {/*</div>*/}

        <div style={barStyle}>
          <svg ref={legend => (this.legend = legend)} />
        </div>

      </div>
    )
  }
}

const barStyle = {
  display: 'inline-flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}

const minMaxStyle = {
  display: 'inline-flex',
  width: '100%',
  alignItems: 'center',
  color: '#333333',
  justifyContent: 'center'
}

const minStyle = {
  width: '2em',
  paddingRight: '0.5em'
}

const maxStyle = {
  width: '2em',
  paddingLeft: '0.5em'
}

const titleStyle = {
  color: '#555555',
  fontFace: 'Roboto',
  fontSize: '0.7em',
  fontWeight: 400,
  padding: '0.3em'
}

export default LegendPanel
