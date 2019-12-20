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

  groupNames.forEach(groupName => {
    // Center and size of the area (circle)
    const position = positions[groupName]

    // Member genes assigned to the group
    const memberIds = groups[groupName]

    if (memberIds == undefined || memberIds == null || memberIds.length === 0) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!', groupName)
    } else if (memberIds.length === 1) {
      const node = nodeMap.get(memberIds[0])
      node.position.x = position.x * 15
      node.position.y = position.y * 15
    } else {
      const selectString = '#' + memberIds.join(',#')
      const memberGenes = cy.nodes(selectString)
      const connected = memberGenes.connectedEdges()
      const subgraph = memberGenes.union(connected)
      console.log('*Selector info:', groupName, subgraph.nodes().size(),
        subgraph.edges().size())

      const layout = subgraph.layout({
        name: 'circle'
        // animate: false
        //   x1: position.x,
        //   y1: position.y,
        //   w: position.r * 2,
        //   h: position.r * 2
        // }
      })

      layout.run()
      subgraph.nodes().forEach(node => {
        const original = node.position()
        node.position({
          x: original.x * 30,
          y: original.y * 30
        })
      })
      subgraph.nodes().shift({ x: position.x * 15, y: position.y * 15 })
    }
  })
}

export { localLayout }
