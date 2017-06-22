const d3Hierarchy = require('d3-hierarchy')


const clusterLayout = (treeEdges, rootId, circular=false) => {

  const d3Edges = getEdges(rootId, treeEdges)
  const d3Tree = getTree(d3Edges)
  applyCluster(d3Tree)

  return extractPositions(d3Tree, circular)
}


const getEdges = (rootId, edges) => {

  // Root node
  const table = []
  table.push({
    id: rootId,
    parentId: ''
  })

  edges.forEach(edge => {
    table.push({
      id: edge.s,
      parentId: edge.t
    })
  })

  return table
}


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

const extractPositions = (d3Tree, circular) => {
  return walk(d3Tree, [], circular)
}

const project = (x, y) => {
  const angle = (x - 90) / 180 * Math.PI
  const radius = y
  return [
    radius * Math.cos(angle),
    radius * Math.sin(angle),
    angle
  ];
}

const walk = (node, cartesianLayout, circular) => {

  let newPos = [node.x, node.y]
  if(circular) {
    newPos = project(node.x, node.y)
  }

  const position = {
    node: node.id,
    x: newPos[0],
    y: newPos[1]
  }

  cartesianLayout.push(position)

  const children = node.children

  if (children !== undefined && children.length !== 0) {
    children.forEach(child => walk(child, cartesianLayout, circular))
  }
  return cartesianLayout
}


module.exports.clusterLayout = clusterLayout
