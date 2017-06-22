const STATUS_MESSAGE = {
  name: 'layout list',
  algorithms: ['d3-cluster', 'd3-tree']
}

const getLayouts = (req, res) => {
  res.json(STATUS_MESSAGE)
}

module.exports.getLayouts = getLayouts
