const extractAll = (currentNode, positions = {}) => {
  const children = currentNode.children

  if(children === undefined || children === null || children.length === 0) {

    const {props, Label} = currentNode.data.data
    const {id} = props
    // Parent node is always a subsystem
    const {parent} = currentNode
    const {name} = parent.data.data.props

    const newId = `${Label}-${name}`
    // This is a leaf node = gene node
    const position = {
      x: currentNode.x,
      y: currentNode.y,
      r: currentNode.r,
      group: `Group:${name}`
    }

    positions[newId] = position
    return positions
  }

  // not a leaf node, recurse
  children.forEach(child => {
    extractAll(child, positions)
  })
}

export { extractAll }