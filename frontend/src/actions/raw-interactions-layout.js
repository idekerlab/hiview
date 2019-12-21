import cytoscape from 'cytoscape'
import regCose from 'cytoscape-cose-bilkent'
regCose(cytoscape)

const localLayout = (network, groups, positions, nodeMap) => {
  console.log('Running local layout:', network, positions, nodeMap, groups)

  // Headless instance of Cyjs
  const cy = cytoscape({
    headless: true,
    elements: network.elements
  })

  console.log('CY instance:', cy)

  const groupNames = Object.keys(groups)

  console.log('GNames = ', groupNames)

  const remainingGenes = []

  let x1 = null
  let y1 = null

  console.log('============================= NSIZE', network.elements)

  groupNames.forEach(groupName => {
    // Center and size of the area (circle)
    const position = positions[groupName]

    if(x1 == null) {
      x1 = position.x
      y1 = position.y
    }

    // Member genes assigned to the group
    const memberIds = groups[groupName]

    if (memberIds == undefined || memberIds == null || memberIds.length === 0) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!', groupName)
    } else if (memberIds.length === 1) {
      remainingGenes.push(memberIds[0])
      console.log('### ADD', remainingGenes)
      // const node = nodeMap.get(memberIds[0])
      // node.position.x = position.x * 15
      // node.position.y = position.y * 15
    } else {
      const selectString = '#' + memberIds.join(',#')
      const memberGenes = cy.nodes(selectString)

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
      if (network.elements.nodes.length < 1000) {
        layout = subgraph.layout({
          name: 'cose',
          animate: false,
          boundingBox: {
            x1: position.x * 15,
            y1: position.y * 15,
            w: position.r * 2 * 15,
            h: position.r * 2 * 15
          }
        })
        layout.run()
        // subgraph.nodes().shift({ x: position.x * 15, y: position.y * 15 })
      } else {
        layout = subgraph.layout({
          name: 'grid'
        })
        layout.run()
        subgraph.nodes().shift({ x: position.x * 15, y: position.y * 15 })
      }

      // subgraph.nodes().forEach(node => {
      //   const original = node.position()
      //   node.position({
      //     x: original.x * 30,
      //     y: original.y * 30
      //   })
      // })
    }
  })

  // Apply layout for remaining genes
  if (remainingGenes.length !== 0) {
    console.log('===================== Circular')

    const selectString = '#' + remainingGenes.join(',#')
    const memberGenes = cy.nodes(selectString)
    const connected = memberGenes.edgesWith(memberGenes)
    const subgraph2 = memberGenes.union(connected)
    const circularLayout = subgraph2.layout({
      name: 'circle'
    })
    circularLayout.run()
    subgraph2.nodes().forEach(node => {
      const original = node.position()
      node.position({
        x: original.x * 40,
        y: original.y * 40
      })
    })
    subgraph2.nodes().shift({ x: x1 * 15, y: y1 * 15 })
  }
}

export { localLayout }
