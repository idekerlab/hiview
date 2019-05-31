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
const cyjs2tree = (cyjs, networkActions) => {
  if (!cyjs) {
    return null
  }

  console.log('Converting to D3 obj----------------')
  //Find root of the tree
  const nodes = cyjs.elements.nodes
  let nodeMap = {}
  const root = preprocessNodes(nodes, nodeMap)
  const rootId = root.data.id
  const edges = cyjs.elements.edges

  // Create table first to use D3 function
  let table = transform(rootId, edges, nodeMap)

  // Run stratification function
  const tree = d3Hierarchy
    .stratify()
    .id(d => d.id)
    .parentId(d => d.parent)(table)

  table = null
  nodeMap = null


  const geneMap = new Map()
  createGeneMap(tree, geneMap)

  console.log('GENEMAP ==== ', geneMap)
  networkActions.setGeneMap(geneMap)

  // Re-wire tree to use reference for copy nodes
  getOriginalBranches(tree)

  // Add it to copies
  addBranches(tree)
  return tree
}

const createGeneMap = (treeNode, geneMap) => {
  const current = treeNode

  const children = current.children

  if (children === undefined) {
    // This is a leaf node

    if(treeNode.data.NodeType === 'Gene') {
      addSelfToAllParents(treeNode.parent, geneMap, treeNode.data.Label)
    }
    return
  }

  let numChildren = children.length

  while (numChildren--) {
    const childNode = children[numChildren]
    createGeneMap(childNode, geneMap)
  }
}

const addSelfToAllParents = (treeNode, geneMap, geneName) => {
  const id = treeNode.id.toString()
  let idList = geneMap.get(id)
  if(!idList) {
    idList = new Set()
    geneMap.set(id, idList)
  }

  idList.add(geneName)

  const parent = treeNode.parent
  if (parent === null || parent === undefined || treeNode.parent === '') {
    return
  }

  addSelfToAllParents(parent, geneMap, geneName)
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

  const nodeChildren = node.children
  if (nodeChildren !== undefined) {
    let len = nodeChildren.length
    let termFound = false
    while (len--) {
      const child = nodeChildren[len]
      if (child.data.NodeType !== 'Gene') {
        termFound = true
        break
      }
    }
    if (!termFound) {
      delete node.children
      return
    }
  }

  // Remove children of gene-only term

  if (alias) {
    const branch = branches.get(originalId)

    // Add this branch only if it has terms inside.
    const children = branch.children
    if (children !== undefined) {
      let numChildren = children.length
      let withTerm = false
      while (numChildren--) {
        const child = children[numChildren]
        if (child.data.NodeType !== 'Gene') {
          withTerm = true
          break
        }
      }
      if (!withTerm) {
        return
      }
    }
    node.depth = branch.depth
    node.height = branch.height
    node['children'] = children
    node['data'] = branch.data
    node['id'] = branch.id
  }

  if (nodeChildren) {
    let childCount = nodeChildren.length
    while (childCount--) {
      const child = nodeChildren[childCount]
      addBranches(child)
    }
  }
}

export default cyjs2tree
