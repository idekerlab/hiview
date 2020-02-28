import * as d3ScaleChromatic from 'd3-scale-chromatic'


const createColorMap = selection => {
  console.log('Creating from selection::', selection)

  const colors = d3ScaleChromatic.schemePaired

  const uniqueGenes = new Set()
  selection.forEach(entry => {
    const geneType = entry.Display_Label

    uniqueGenes.add(geneType)
  })

  console.log('Genes::', uniqueGenes, colors, colors.length)

  const numColors = colors.length
  let idx = 0

  const colorMap = new Map()

  uniqueGenes.forEach(gene => {

    if(idx < numColors) {
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

  console.log('CM::', colorMap, id2color)

  return id2color
}

export { createColorMap }
