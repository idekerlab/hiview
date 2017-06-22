const d3Hierarchy = require('d3-hierarchy')

const convert = (treeEdges, rootId) => {

  console.log('---------Convert----------')

  const d3Edges = getEdges(rootId, treeEdges)

  const d3Tree = getTree(d3Edges)
  applyCluster(d3Tree)


  //TODO: extract locations
  const layoutList = []

  // Extract here

  return layoutList
}

// const getNodeSet = edges => {
//   const nodes = new Set()
//
//   edges.forEach(edge => {
//     const source = edge.s
//     const target = edge.t
//     nodes.add(source)
//     nodes.add(target)
//   })
//
//   console.log('Size = ' + nodes.size)
//
//   return nodes
// }

const getEdges = (rootId, edges) => {

  const csv = []
  csv.push({
    id: rootId,
    parentId: ''
  })

  edges.forEach(edge => {
    csv.push({
      id: edge.s,
      parentId: edge.t
    })
  })

  console.log('Length = ' + csv.length)

  return csv
}


/**
 * From a
 *
 * @param rootId
 * @param tree
 * @returns {{}}
 */
const getTree = edges => {

  return d3Hierarchy
    .stratify()
    .id(d => (d.id))
    .parentId(d => (d.parentId))(edges)
}

const applyCluster = d3Tree => {

  const layout = d3Hierarchy
    .cluster()
    .size([360, 1600])
    .separation((a, b) => {
      return (a.parent === b.parent ? 1: 2) / a.depth
    })

  // Apply layout and generate (x,y) positions
  layout(d3Tree)
}

module.exports.convert = convert
