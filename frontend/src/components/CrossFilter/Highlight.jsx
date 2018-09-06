import React from 'react'
import { ScaleUtils, AbstractSeries } from 'react-vis'

class Highlight extends AbstractSeries {

  state = {
    dragging: false,
    drawArea: { top: 0, right: 0, bottom: 0, left: 10 },
    drawing: false,
    startLocX: 0,
    startLocY: 0
  }


  render() {
    const { innerWidth, marginLeft, innerHeight, color, opacity } = this.props
    const {
      drawArea: { left, right, top, bottom }
    } = this.state

    return (
      <g
        transform={`translate(${0}, ${0})`}
        className="highlight-container"
      >
        <rect
          className="mouse-target"
          fill="black"
          opacity="0"
          x={Math.max(0, marginLeft)}
          y={0}
          width={innerWidth}
          height={Math.max(0, innerHeight)}
        />
        <rect
          className="highlight"
          pointerEvents="none"
          opacity={opacity}
          fill={color}
          x={left}
          y={top}
          width={innerWidth}
          height={innerHeight}
        />
      </g>
    )
  }
}

Highlight.displayName = 'HighlightOverlay'
Highlight.defaultProps = {
  allow: 'x',
  color: 'rgb(77, 182, 172)',
  opacity: 0.3
}

export default Highlight
