import React, {Component} from 'react'
import * as d3Selection from 'd3-selection'
import * as d3Array from 'd3-array'
import * as d3Scale from 'd3-scale'

const legendPanelStyle = {
  display: 'flex',
  flexDirection: 'column',
  color: '#555555',
  fontFamily: 'Roboto',
  background: 'white',
  padding: '0.8em'
}

const BAR_HEIGHT = 35


class LegendPanel extends Component {

  componentDidMount() {
    const svgLegend = this.legend

    const parentWidth = this.container.parentNode.clientWidth


    const svg = d3Selection
      .select(svgLegend)
      .attr('width', parentWidth)
      .attr('height', BAR_HEIGHT)
      .append("g")

    const colorScale = d3Scale.scaleSequential(d3Scale.interpolateInferno)
      .domain([0, parentWidth])

    const bars = svg.selectAll('.bars')
      .data(d3Array.range(parentWidth), function (d) {
        return d;
      })
      .enter().append('rect')
      .attr('class', 'bars')
      .attr('x', function (d, i) {
        return i;
      })
      .attr('y', 0)
      .attr('height', BAR_HEIGHT)
      .attr('width', 1)
      .style('fill', function (d, i) {
        return colorScale(d);
      })
  }

  render() {

    const minRaw = this.props.networkProps['RF score min']
    const maxRaw = this.props.networkProps['RF score max']

    let min = 0
    let max = 1
    if(minRaw !== undefined) {
      min = Number(minRaw).toFixed(4)
    }

    if(minRaw !== undefined) {
      max = Number(maxRaw).toFixed(4)
    }

    return (
      <div ref={container=> this.container = container} style={legendPanelStyle}>
        <svg ref={legend => this.legend = legend}></svg>

        <div style={minMaxStyle}>
          <div style={minStyle}>{min}</div>
          <div style={titleStyle}>Similarity Score</div>
          <div style={maxStyle}>{max}</div>
        </div>
      </div>
    )
  }
}

const minMaxStyle = {
  display: 'inline-flex',
  width: '100%',
  marginTop: '0.3em',
  color: '#666666',
}

const minStyle = {
  marginRight: 'auto'

}

const maxStyle = {
  marginLeft: 'auto'
}

const titleStyle = {
  color: '#777777',
  fontFace: 'Roboto',
  fontSize: '1.2em',
  fontWeight: 500,
  textAlign: 'center'
}



export default LegendPanel
