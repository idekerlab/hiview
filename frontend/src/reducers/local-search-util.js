import * as d3ScaleChromatic from 'd3-scale-chromatic'

const tableau = d3ScaleChromatic.schemeTableau10
const colors = [
  tableau[1],
  tableau[2],
  tableau[4],
  tableau[5],
  tableau[6],
  tableau[7],
  tableau[8],
  tableau[9]
]

const createColorMap = selection => {
  const uniqueGenes = new Set()
  selection.forEach(entry => {
    const geneType = entry.Display_Label

    uniqueGenes.add(geneType)
  })

  const numColors = colors.length
  let idx = 0

  const colorMap = new Map()

  uniqueGenes.forEach(gene => {
    if (idx < numColors) {
      colorMap.set(gene, colors[idx])
    } else {
      idx = 0
      colorMap.set(gene, colors[idx])
    }
    idx++
  })

  const id2color = new Map()
  selection.forEach(entry => {
    const id = entry.id
    const color = colorMap.get(entry.Display_Label)
    id2color.set(id, color)
  })
  return id2color
}

export { createColorMap }
