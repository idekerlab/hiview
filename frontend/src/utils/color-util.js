import * as d3ScaleChromatic from 'd3-scale-chromatic'

// Preset  discrete color map (10)
const COLORS = d3ScaleChromatic.schemeTableau10

const colorMap = (idx) => COLORS[idx]

const getColor10 = (idx) => {
  const colorSpaceSize = COLORS.length
  return colorMap(idx % colorSpaceSize)
}

export { getColor10 }
