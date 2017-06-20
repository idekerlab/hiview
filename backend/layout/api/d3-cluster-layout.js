const d3Hierarchy = require('d3-hierarchy')

const {convert} = require('./cxToD3')

// Wrapper for D3 Cluster Layout

const LAYOUT_FINISHED = {
  message: 'Layout finished'
}

const applyLayout = (req, res) => {

  const cx = req.body
  res.json(convert(cx, 1988))
}


const doLayout = (edges) => {

}


module.exports.applyLayout = applyLayout