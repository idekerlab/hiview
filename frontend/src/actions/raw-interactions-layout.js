import cytoscape from 'cytoscape'
import regCose from 'cytoscape-cose-bilkent'
import { scaleBand } from 'd3-scale'
import { setGroupPositions } from './raw-interactions'
regCose(cytoscape)

const genePositionScalingX = 2
const genePositionScalingY = 2

const getNameMap = nodeMap => {
  const nameMap = {}
  nodeMap.forEach(node => {
    const {data} = node
    const name = data.name
    nameMap[name] = node
  })
  return nameMap
}

const setGenePositions = ({nodeMap, positions}) => {
  const name2node = getNameMap(nodeMap)

  for(let key in positions) {
    const position = positions[key]
    const node = name2node[key]
    node.position.x = position.x * genePositionScalingX
    node.position.y = position.y * genePositionScalingY
  }
}

/**
 * 
 * Modify original layout based on Circle Packing
 * 
 * @param {*} network 
 * @param {*} groups 
 * @param {*} positions - key is "name," value is {x, y}
 * @param {*} nodeMap - key is "node id", value is node
 */
const localLayout = (network, groupsMap, positions, nodeMap) => {

  let groups = groupsMap
  // Case 1: gene only node - no nested structure.
  if(groupsMap === null || groupsMap === undefined) {
    setGenePositions({nodeMap, positions})
    return
  }

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
    const positionMembers = positions[groupName + '-members']

    // Member genes assigned to the group
    const memberIds = groups[groupName]

    if (memberIds == undefined || memberIds == null || memberIds.length === 0) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!', groupName)
    } else if (memberIds.length === 1) {
      remainingGenes.push(memberIds[0])
      const node = nodeMap.get(memberIds[0])
      node.position.x = position.x * genePositionScalingX 
      node.position.y = position.y * genePositionScalingY
    } else {

      memberIds.forEach(memberId => {
        let node = nodeMap.get(memberId)
        if(node === undefined) {
          console.log('node not found', memberId)

        } else {
          const childPosition = positionMembers[node.data.name]
          if(childPosition === undefined) {
            node.position.x = position.x * genePositionScalingX 
            node.position.y = position.y * genePositionScalingY
          } else {
            node.position.x = childPosition.x * genePositionScalingX 
            node.position.y = childPosition.y * genePositionScalingY
          }

        }

      })
      return


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
        
        // layout = subgraph.layout({
        //   name: 'cose',
        //   animate: false,
        //   // numIter: 500,
        //   nodeOverlap: 15,
        //   idealEdgeLength: 150,
        //   nodeRepulsion: 4000,
        //   // nodeDimensionsIncludeLabels: true,
        //   boundingBox: {
        //     x1: position.x,
        //     y1: position.y,
        //     w: position.r * 3,
        //     h: position.r * 3
        //   }
        // })
        // layout.run()
        // subgraph.nodes().shift({
        //   x: position.x * SCALING_FACTOR,
        //   y: position.y * SCALING_FACTOR
        // })
        // subgraph.nodes().shift({
        //   x: position.x * genePositionScalingX,
        //   y: position.y * genePositionScalingY
        // })



        // layout = subgraph.layout({
        //   name: 'circle',
        //   boundingBox: {
        //     x1: 0,
        //     y1: 0,
        //     w: position.r * 2 * 0.8 * genePositionScalingX,
        //     h: position.r * 2 * 0.8 * genePositionScalingY
        //   }
        // })
        // layout.run()
        // subgraph.nodes().shift({
        //   x: (position.x - position.r) * genePositionScalingX,
        //   y: (position.y - position.r) * genePositionScalingY
        // })
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

  const box = groupNodes.boundingBox()

  // Apply layout for remaining genes
  if (remainingGenes.length !== 0) {
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
    // coseLayout.run()

    // subgraph2.nodes().shift({ x: x1 * 15, y: y1 * 15 })
    // subgraph2.nodes().forEach(node => {
    //   const original = node.position()
    //   node.position({
    //     x: original.x * 1.2,
    //     y: original.y * 1.2
    //   })
    // })
  }
}

const checkMembers = () => {

}

export { localLayout }
