const d3Hierarchy = require('d3-hierarchy')

// Wrapper for D3 Cluster Layout

const LAYOUT_FINISHED = {
  message: 'Layout finished'
}

const applyLayout = (req, res) => {

  const cx = req.body
  const edges = cx.filter(element => (element.edges !== undefined))
  res.json(edges[0].edges)
}


module.exports.applyCluster = applyLayout
