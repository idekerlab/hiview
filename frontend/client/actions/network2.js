export const FETCH_NETWORK = 'FETCH_NETWORK'
const fetchNetwork = url => {
  return {
    type: FETCH_NETWORK,
    url
  }
}

export const RECEIVE_NETWORK = 'RECEIVE_NETWORK'
const receiveNetwork = (url, json) => {

  return {
    type: RECEIVE_NETWORK,
    url,
    network: json
  }
}

const fetchNet = url => {
  return fetch(url)
}

/**
 * remove unnecessary edges for visualization
 */
const filterEdges = network => {
  const edges = []
  network.elements.edges.forEach(edge => {
    if (edge.data.Is_Tree_Edge === 'Tree') {
      edges.push(edge)
    }
  })

  network.elements.edges = edges
  return network
}


export const fetchNetworkFromUrl = url => {

  return dispatch => {
    dispatch(fetchNetwork(url))

    return fetchNet(url)
      .then(response => (response.json()))
      .then(rawCx => (filterEdges(rawCx)))
      .then(json => (layout(json)))
      .then(network => dispatch(receiveNetwork(url, network)))
  }
}


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
    console.log('FAILED!!!!!!!!!!!!!!!!!!!!!!!!! Root Node not found: ')
    // Return network as-is
    return network
  }

  console.log('Root Node found: ' + rootNodeId)

  network.data.rootId = rootNodeId

  const layoutMap = getTree(rootNodeId, network)
  return applyLayout(layoutMap, network)
}
