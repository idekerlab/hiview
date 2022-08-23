const extractAll = (currentNode, positions = {}, topGroups, baseNode) => {
  // Check if current node is a leaf or not
  const children = currentNode.children

  if (topGroups === undefined) {
    topGroups = extractTopGroups(children)
  }

  if (children === undefined || children === null || children.length === 0) {
    // This is a leaf node (genes)
    let parent = currentNode.parent
    const { Label } = currentNode.data.data
    const { name } = parent.data.data.props
    const parentLabel = parent.data.data.Label

    let newId = `${Label}-${name}`

    // This is a leaf node = gene node
    const position = {
      x: currentNode.x,
      y: currentNode.y,
      base: baseNode,
      baseName: parentLabel,
    }
    
    if(!topGroups.has(name)) {
      // This node belongs to the current root node
      position['isRootMember'] = true
    }

    positions[newId] = position
    return positions
  }

  // not a leaf node, recurse
  children.forEach((child) => {
    const base = findBaseGroup(child, topGroups)
    extractAll(child, positions, topGroups, base)
  })
}

const extractTopGroups = (topLevelNodes) => {
  const topGroups = new Set()
  if(topLevelNodes === null || topLevelNodes === undefined) {
    return topGroups
  }
  
  topLevelNodes.forEach((node) => {
    const { data } = node.data
    const { NodeType, props } = data
    if (NodeType !== 'Gene') {
      topGroups.add(props.name)
    }
  })
  return topGroups
}

const findBaseGroup = (node, topGroups) => {
  const directParent = node.parent
  if(directParent === null) {
    // This one belongs to the node itself
    return node.data.data.props.name
  }
  const { name } = directParent.data.data.props

  if (topGroups.has(name)) {
    return name
  } else {
    return findBaseGroup(directParent, topGroups)
  }
}

export const getPleio = (allPositions) => {
  const pleio = new Set()
  const pleioNodes = new Set()

  for (let key in allPositions) {
    const parts = key.split('-')
    const geneName = parts[0]
    const isPleio = pleio.has(geneName)
    if (isPleio) {
      pleioNodes.add(geneName)
    }
    pleio.add(geneName)
  }
  return pleioNodes
}

export { extractAll }
