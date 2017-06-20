const d3Hierarchy = require('d3-hierarchy')

const convert = (cx, rootId) => {

  console.log('---------Convert----------')
  const edges = cx.filter(element => (element.edges !== undefined))

  if(edges === undefined || edges === null) {
    return {}
  }

  const es = edges[0].edges

  const d3Edges = getEdges(rootId.toString(), es)

  return getTree(d3Edges)
}

const getNodeSet = edges => {
  const nodes = new Set()

  edges.forEach(edge => {
    const source = edge.s
    const target = edge.t
    nodes.add(source)
    nodes.add(target)
  })

  console.log('Size = ' + nodes.size)

  return nodes
}

const getEdges = (rootId, edges) => {

  const csv = []
  csv.push({
    name: rootId,
    parent: ''
  })

  edges.forEach(edge => {
    csv.push({
      name: edge.s.toString(),
      parent: edge.t.toString()
    })
  })

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
  console.log(edges)

  const d3tree = d3Hierarchy
    .stratify()
    .id(function(d) {
      return d.name;
    })
    .parentId(function(d) {
      return d.parent;
    })(edges);

  console.log(d3tree)

  return d3tree
}

module.exports.convert = convert
