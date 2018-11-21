import * as d3Hierarchy from 'd3-hierarchy'

let originals = new Set()
let aliases = new Set()
const branches = new Map()

/**
 * Takes hierarchy in Cytoscape.js format and generates new D3 tree
 * object
 *
 * @param cyjs
 * @returns {*}
 */
const cyjs2tree = cyjs => {
  const t0 = performance.now()
  if (!cyjs) {
    return null
  }

  //Find root of the tree
  const nodes = cyjs.elements.nodes
  const nodeMap = {}
  const root = preprocessNodes(nodes, nodeMap)
  const rootId = root.data.id
  const edges = cyjs.elements.edges

  // Create table first to use D3 function
  const table = transform(rootId, edges, nodeMap)

  // Run stratification function
  const tree = d3Hierarchy
    .stratify()
    .id(d => d.id)
    .parentId(d => d.parent)(table)

  // Re-wire tree to use reference for copy nodes
  getOriginalBranches(tree)

  // Add it to copies
  addBranches(tree)

  // const url =
  //   'http://ec2-35-167-36-71.us-west-2.compute.amazonaws.com/2814c6d7-e54e-11e8-9c46-0660b7976219.json'
  // const headers = new Headers()
  // headers.set('Accept-Encoding', 'br')
  // const setting = {
  //   method: 'GET',
  //   mode: 'no-cors',
  //   headers: headers
  // }
  // fetch(url, setting)
  //   .then(response => response.json())
  //   .then(t => {
  //     console.log('* re-wired tree generated in ', performance.now() - t0)
  //     return t
  //   })

  return tree
}

const preprocessNodes = (nodes, nodeMap) => {
  let idx = nodes.length

  // Root info is stored in network data
  let root = null

  while (idx--) {
    const node = nodes[idx]
    const data = node.data
    if (
      !data['Label'].includes('Hidden') &&
      !data['Label'].includes('Linked')
    ) {
      const isRoot = data.isRoot
      if (isRoot) {
        root = nodes[idx]
      }

      const isAlias = data.alias
      if (isAlias) {
        originals.add(data.originalId)
        aliases.add(data.id)
      }

      const nodeData = nodes[idx].data
      nodeMap[nodeData.id] = nodeData
    }
  }
  return root
}

/**
 * Convert CYJS JSON to table
 * @param rootId
 * @param edges
 * @param nodeMap
 * @returns {Array}
 */
const transform = (rootId, edges, nodeMap) => {
  const table = []

  table.push({
    id: nodeMap[rootId].id,
    Label: nodeMap[rootId].Label,
    parent: '',
    props: nodeMap[rootId]
  })

  edges.forEach(edge => {
    const source = nodeMap[edge.data.source]
    const target = nodeMap[edge.data.target]

    if (
      source !== undefined &&
      target !== undefined &&
      edge.data['Is_Tree_Edge'] === 'Tree' &&
      nodeMap[source.id] !== undefined &&
      nodeMap[target.id] !== undefined
    ) {
      const node = {
        id: source.id,
        Label: source.Label,
        parent: target.id,
        value: source.Size,
        NodeType: source.NodeType,
        props: source,
        alias: source.alias
      }

      if (source.originalId) {
        node['originalId'] = source.originalId
      }
      table.push(node)
    }
  })

  return table
}

const getOriginalBranches = node => {
  if (originals.has(node.id)) {
    branches.set(node.id, node)
  }

  const children = node.children
  if (children) {
    let childCount = children.length
    while (childCount--) {
      getOriginalBranches(children[childCount])
    }
  }
}

const addBranches = node => {
  const originalId = node.data.props.originalId
  const alias = node.data.props.alias

  if (alias) {
    const branch = branches.get(originalId)
    node.depth = branch.depth
    node.height = branch.height
    node['children'] = branch.children
    node['data'] = branch.data
    node['id'] = branch.id
  }

  const children = node.children
  if (children) {
    let childCount = children.length
    while (childCount--) {
      const child = children[childCount]
      addBranches(child)
    }
  }
}

export default cyjs2tree
