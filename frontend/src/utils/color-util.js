import * as d3ScaleChromatic from 'd3-scale-chromatic'
import * as d3Scale from 'd3-scale'

// Preset  discrete color map (10)
// const COLORS = d3ScaleChromatic.schemeAccent

// const COLORS = d3ScaleChromatic.schemeCategory10
const COLORS = d3ScaleChromatic.schemeTableau10

const colorMap = (idx) => COLORS[idx]

const getColor10 = (idx) => {
  const colorSpaceSize = COLORS.length
  return colorMap(idx % colorSpaceSize)
}

const getColorScaleInferno = ({ min = 0, max = 1 }) => {
  return d3Scale
    .scaleSequential(d3ScaleChromatic.interpolateInferno)
    .domain([min, max])
}

export { getColor10, getColorScaleInferno }
