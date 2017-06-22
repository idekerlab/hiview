const {clusterLayout} = require('./cxToD3')

const CIRCULAR = 'circular'


const applyClusterLayout = (req, res) => {
  const edges = req.body
  const root = req.query.root

  const layoutType = req.params.style
  let isCircular = false
  if(layoutType !== undefined && layoutType === CIRCULAR ) {
    isCircular = true
  }

  const cartesianLayout = clusterLayout(edges, root, isCircular)

  res.json(cartesianLayout)
}


module.exports.applyClusterLayout = applyClusterLayout