import cytoscape from 'cytoscape'
import regCose from 'cytoscape-cose-bilkent'
import { scaleBand } from 'd3-scale'
regCose(cytoscape)

const SCALING_FACTOR = 2

const localLayout = (network, groups, positions, nodeMap) => {
  console.log('Running local layout:', network, positions, nodeMap, groups)

  // Headless instance of Cyjs
  const cy = cytoscape({
    headless: true,
    elements: network.elements
  })

  const groupNames = Object.keys(groups)
  const remainingGenes = []

  // Sort from largest to smallest

  const sizeMap = new Map()
  groupNames.forEach(name => {
    sizeMap.set(name, groups[name].length)
  })

  const sorted = [...sizeMap.entries()].sort((a, b) => b[1] - a[1])

  // Empty collection for group nodes
  const groupNodes = cy.collection()

  sorted.forEach(entry => {
    const groupName = entry[0]
    const position = positions[groupName]

    // Member genes assigned to the group
    const memberIds = groups[groupName]

    if (memberIds == undefined || memberIds == null || memberIds.length === 0) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!', groupName)
    } else if (memberIds.length === 1) {
      remainingGenes.push(memberIds[0])
      // console.log('### ADD', remainingGenes)
      // const node = nodeMap.get(memberIds[0])
      // node.position.x = position.x * 15
      // node.position.y = position.y * 15
    } else {
      const selectString = '#' + memberIds.join(',#')
      const memberGenes = cy.nodes(selectString)
      groupNodes.merge(memberGenes)
      const connected = memberGenes.edgesWith(memberGenes)

      // const connected = memberGenes.connectedEdges()
      // const genes = new Set()
      // memberGenes.forEach(gene => {
      //   genes.add(gene.data('name'))
      // })
      //
      // connected.forEach(edge => {
      //   const s = edge.source().data('name')
      //   const t = edge.target().data('name')
      //
      //
      //   if(!genes.has(s)) {
      //     memberGenes.add(edge.source())
      //     genes.add(s)
      //   }
      //
      //   if(!genes.has(t)) {
      //     memberGenes.add(edge.target())
      //     genes.add(t)
      //   }
      // })

      // connected.forEach(edge => {
      //   const s = edge.source().data('name')
      //   const t = edge.target().data('name')
      //
      //   if (!genes.has(s) ) {
      //     memberGenes.add(edge.source())
      //   }
      //
      //
      //   if(!genes.has(t)) {
      //     memberGenes.add(edge.target())
      //   }
      //
      //   genes.add(s)
      //   genes.add(t)
      //   nodeSet.add(s)
      //   nodeSet.add(t)
      // })
      const subgraph = memberGenes.union(connected)
      let layout = {}

      if (network.elements.nodes.length < 100000) {
        layout = subgraph.layout({
          name: 'cose',
          animate: false,
          // numIter: 500,
          nodeOverlap: 15,
          idealEdgeLength: 150,
          nodeRepulsion: 4000,
          // nodeDimensionsIncludeLabels: true,
          boundingBox: {
            x1: position.x,
            y1: position.y,
            w: position.r * 3,
            h: position.r * 3
          }
        })
        layout.run()
        subgraph.nodes().shift({
          x: position.x * SCALING_FACTOR,
          y: position.y * SCALING_FACTOR
        })
      } else {
        layout = subgraph.layout({
          name: 'grid'
        })
        layout.run()
        // subgraph.nodes().shift({
        //   x: position.x * SCALING_FACTOR,
        //   y: position.y * SCALING_FACTOR
        // })
      }

      // Find the bounding box
      // subgraph.nodes().forEach(node => {
      //   const original = node.position()
      //   if (original.x < xMin) {
      //     xMin = original.x
      //   } else if (original.x > xMax) {
      //     xMax = original.x
      //   }

      //   if (original.y < yMin) {
      //     yMin = original.y
      //   } else if (original.y > yMax) {
      //     yMax = original.y
      //   }
      // })
      // subgraph.nodes().shift({
      //   x: position.x * SCALING_FACTOR,
      //   y: position.y * SCALING_FACTOR
      // })
    }
  })

  console.log('# ALl G nodes::', groupNodes)

  const box = groupNodes.boundingBox()
  console.log('# ALl G nodes BOX::', box)

  // Apply layout for remaining genes
  if (remainingGenes.length !== 0) {
    console.log('===================== Circular')

    const selectString = '#' + remainingGenes.join(',#')
    const memberGenes = cy.nodes(selectString)
    const connected = memberGenes.edgesWith(memberGenes)
    const subgraph2 = memberGenes.union(connected)
    const circularLayout = subgraph2.layout({
      name: 'circle',
      boundingBox: box,
      radius:
        0.9 *
        Math.sqrt(Math.pow(box.x2 - box.x2, 2) + Math.pow(box.y2 - box.y1, 2))
    })
    // circularLayout.run()
    // subgraph2.nodes().shift({
    //   x: box.x1 * SCALING_FACTOR,
    //   y: box.y1 * SCALING_FACTOR
    // })

    // const xCenter = xMax - xMin
    // const yCenter = yMax - yMin
    // subgraph2.nodes().shift({ x: -xCenter, y: -yCenter })
    // subgraph2.nodes().shift({
    //   x: position.x * SCALING_FACTOR,
    //   y: position.y * SCALING_FACTOR
    // })

    const coseLayout = subgraph2.layout({
      name: 'cose',
      animate: false,
      numIter: 300,
      // nodeOverlap: 20,
      // idealEdgeLength: 300,
      // nodeDimensionsIncludeLabels: true,
      boundingBox: box
      // randomize: true

      // nodeRepulsion: function( node ){ return 20480; }

      // boundingBox: {
      //   x1: position.x * 15,
      //   y1: position.y * 15,
      //   w: position.r * 2 * 15,
      //   h: position.r * 2 * 15
      // }
    })
    coseLayout.run()

    // subgraph2.nodes().shift({ x: x1 * 15, y: y1 * 15 })
    // subgraph2.nodes().forEach(node => {
    //   const original = node.position()
    //   node.position({
    //     x: original.x * 1.2,
    //     y: original.y * 1.2
    //   })
    // })
  } else {
    console.log('===================== Circular')
  }
}

export { localLayout }
