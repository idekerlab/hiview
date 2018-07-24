import * as d3Hierarchy from 'd3-hierarchy'

const cyjs2tree = cyjs => {
  if (cyjs === undefined || cyjs === null) {
    // Return empty

    return null
  }

  //Find root
  // console.log('CyJS data: ', cyjs)
  const nodes = cyjs.elements.nodes
  const nodeMap = {}
  const root = preprocessNodes(nodes, nodeMap )

  const rootId = root.data.id
  const edges = cyjs.elements.edges

  const table = transform(rootId, edges, nodeMap)

  const tree = d3Hierarchy
    .stratify()
    .id(d => d.id)
    .parentId(d => d.parent)(table)


  getOriginalBranches(tree)
  addBranches(tree)

  return tree
}


let originals = new Set()
let aliases = new Set()

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
      if(isAlias) {
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
 * Convert CYJS to table
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

      if(source.originalId) {
        node['originalId'] = source.originalId
      }
      table.push(node)
    }
  })

  return table
}

let counter = 0

const branches = new Map()

const getOriginalBranches = (node) => {

  const children = node.children

  if(originals.has(node.id)) {
    // console.log('Orignal=======> Orignal', node.data)
    branches.set(node.id, node)
  }

  if(children) {
    let childCount = children.length
    while(childCount--) {
      const child = children[childCount]
      getOriginalBranches(child)
    }
  } else {
    return
  }

}

const addBranches = (node) => {

  const children = node.children
  const originalId = node.data.props.originalId
  const alias = node.data.props.alias


  if(alias) {
    const branch = branches.get(originalId)
    // console.log('!!!!!!!!!!!!!!!!!!!BR======> ', branch)
    // console.log('!!!!!!!!!!!!!!!!!!!ND======> ', node)
    node.depth = branch.depth
    node.height = branch.height
    node['children'] = branch.children
    node['data'] = branch.data
    node['id'] = branch.id
    // console.log('!!!!!!!!!!!!!!!!!!!MOD======> ', node)
  }

  if(children) {
    let childCount = children.length
    while(childCount--) {
      const child = children[childCount]
      addBranches(child)
    }
  } else {
    return
  }

}


export default cyjs2tree
