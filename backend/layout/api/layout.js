const d3Hierarchy = require('d3-hierarchy')

const STATUS_MESSAGE = {
  name: 'layout list',
  algorithms: ['d3-cluster', 'd3-tree']
}



const getLayouts = (req, res) => {
  res.json(STATUS_MESSAGE)
}



module.exports.getLayouts = getLayouts


const findRoot = network => {
  const nodes = network.elements.nodes

  let minSize = null
  let maxSize = null

  let rootId = null

  for (let i = 0; i<nodes.length; i++) {
    const node = nodes[i]
    const isRoot = node.data.isRoot
    const name = node.data.name

    if (isRoot === 'True') {
      rootId = node.data.id
    }

    const size = node.data.Size
    if(size !== undefined) {
      node.data.Size = parseInt(size)

      if (minSize === null) {
        minSize = size
      }
      if (maxSize === null) {
        maxSize = size
      }
      if (size <= minSize) {
        minSize = size
      }

      if (size >= maxSize) {
        maxSize = size
      }
    }
  }

  network.data.minSize = minSize
  network.data.maxSize = maxSize

  return rootId
}


const layout = network => {

  const rootNodeId = findRoot(network)
  if (rootNodeId === null) {
    // Return network as-is
    return network
  }

  console.log('Root Node found: ' + rootNodeId)

  network.data.rootId = rootNodeId

  const layoutMap = getTree(rootNodeId, network)
  return applyLayout(layoutMap, network)
}
