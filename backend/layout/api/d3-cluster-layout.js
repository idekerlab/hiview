const d3Hierarchy = require('d3-hierarchy')

const {convert} = require('./cxToD3')

// Wrapper for D3 Cluster Layout

const LAYOUT_FINISHED = {
  message: 'Layout finished'
}

const applyLayout = (req, res) => {
  const edges = req.body
  const root = req.query.root


  const d3Tree = convert(edges, root)
  console.log(d3Tree.children)



  res.json(d3Tree)
}


const doLayout = (edges) => {

}


module.exports.applyLayout = applyLayout