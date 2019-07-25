const getGeneMap = (elements, tree) => {
  const nodes = elements.nodes
  const edges = elements.edges

  const nodeMap = new Map()

  let nodeCount = nodes.length

  while(nodeCount--) {
    const n = nodes[nodeCount]
    const nType = n.data.NodeType

    if(nType !== 'Gene') {
      nodeMap.add(n.data.id, [])
    }
  }





}

const dfs = (treeNode, geneMap) => {


  const children = treeNode.children

  if(children === undefined) {
    // This is a leaf node = gene
    addSelfToAllParents(treeNode, geneMap)

  }


}

const addSelfToAllParents = (treeNode, geneMap) => {

}

const traverse = (node) => {

}