import * as d3Scale from 'd3-scale'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
export const MAIN_EDGE_TAG = 'Main Feature'
export const PATTERN = /[ -]/g

const PARENT_WT_TAG = 'Parent weight'
const CHILDREN_WT_TAG = 'Children weight'
const PLEIO_TAG = 'isPleio'
const GROUP_PREFIX = 'Group:'
const BASE_GROUP_TAG = 'baseGroup'

const DEF_COLOR = '#777777'

const compareBy = (fieldName) => (a, b) => {
  let scoreA = a.data[fieldName]
  let scoreB = b.data[fieldName]

  if (scoreA === undefined) {
    scoreA = 0.0
  }

  if (scoreB === undefined) {
    scoreB = 0.0
  }

  let comparison = 0
  if (scoreA > scoreB) {
    comparison = -1
  } else if (scoreA < scoreB) {
    comparison = 1
  }
  return comparison
}

/**
 * Create subset of edges based on minimum score provided.
 *
 * @param edges
 * @param scoreName
 * @param min
 * @returns {Array}
 */
const filter = (edges, scoreName, min) => {
  let subMax = -1.0

  let size = edges.length
  const subset = []

  while (size--) {
    const edge = edges[size]
    const s = edge.data[scoreName]
    let score = 0
    if (s) {
      score = Number(s)
    }
    if (score > min) {
      subset.push(edge)
    }

    if (score > subMax) {
      subMax = score
    }
  }

  return {
    subset,
    subMax,
  }
}

const removeZeroEdges = (edges, scoreName) => {
  let size = edges.length

  const filtered = []

  while (size--) {
    const edge = edges[size]
    const s = edge.data[scoreName]

    if (s !== 0 && s !== undefined) {
      filtered.push(edge)
    }
  }

  return filtered
}

const filterOld = (edges, maxEdgeCount) => {
  const numEdges = edges.length
  if (numEdges <= maxEdgeCount) {
    return edges
  }

  return edges.slice(0, maxEdgeCount)
}

const generateColorMap = (weightRange, minVal, maxVal, parentScore) => {
  // Create color mapper based on the local range (parent score to max)
  weightRange.push(parentScore)
  weightRange.sort()

  const slots = weightRange.length
  const colorScale = d3Scale
    .scaleSequential(d3ScaleChromatic.interpolatePlasma)
    .domain([parentScore, maxVal])

  let len = slots
  const colorMap = []

  let correctParentScore = parentScore
  if (parentScore === undefined || parentScore === null || isNaN(parentScore)) {
    correctParentScore = maxVal
  }

  if (weightRange.length === 1) {
    colorMap.push({
      min: minVal,
      max: correctParentScore,
      color: colorScale(maxVal),
    })
    return colorMap
  }

  //First entry: global minimum to Parent
  colorMap.push({
    min: minVal,
    max: correctParentScore,
    color: DEF_COLOR,
  })

  for (let idx = 0; idx < len; idx++) {
    const v1 = weightRange[idx]
    const v2 = weightRange[idx + 1]
    const diff = v2 - v1

    // Case 1: two numbers are the same
    if (diff !== 0) {
      colorMap.push({
        min: v1,
        max: v2,
        color: colorScale(v2),
      })
    }

    // Last entry
    if (idx === len - 2) {
      // Add last one
      const lastEntry = {
        min: v2,
        max: maxVal,
        color: colorScale(maxVal),
      }
      colorMap.push(lastEntry)
      break
    }
  }

  return colorMap
}

const calculateZindex = (score, edge, name) => {
  if (score === undefined || isNaN(score)) {
    // Fix invalid entry

    edge.data[name] = 0
    return 0 // Default value for the zIndex
  }

  return Math.floor(score * 200)
}

const getColorForRange = (colorMap, rawVal, min, max) => {
  let color = null
  const val = rawVal.toFixed(3)
  const mapSize = colorMap.length

  for (let i = 0; i < mapSize; i++) {
    const mapEntry = colorMap[i]
    if (mapEntry.min <= val && val <= mapEntry.max) {
      color = mapEntry.color
      break
    }
  }
  return color
}

export const filterEdge = (network, maxEdgeCount) => {
  if (
    network.elements.edges === undefined ||
    network.elements.edges === null ||
    network.elements.edges.length === 0 ||
    !network.data[MAIN_EDGE_TAG]
  ) {
    network.data['allEdgeScoreRange'] = [0, 0]
    return network
  }

  let mainEdgeType = network.data[MAIN_EDGE_TAG]
  if (mainEdgeType !== undefined) {
    mainEdgeType = mainEdgeType.replace(/ /g, '_')
  }
  const networkData = network.data

  // For new format
  const parentScoreStr = networkData[PARENT_WT_TAG]
  const parentScore = Number(parentScoreStr)
  const childrenWeight = networkData[CHILDREN_WT_TAG]
  let weightRange = []
  if (childrenWeight) {
    // This is the new format
    weightRange = childrenWeight.split('|').map((val) => Number(val))
  }

  const originalEdges = removeZeroEdges(network.elements.edges, mainEdgeType)
  let edges = []
  let minScore = -1

  // Sort all edges and find max.
  originalEdges.sort(compareBy(mainEdgeType))

  // This is always the global maximum
  let maxScore = 0
  const maxEdge = originalEdges[0]
  if (maxEdge !== undefined) {
    const maxData = maxEdge.data
    maxScore = maxData[mainEdgeType]
  }

  if (maxScore === undefined) {
    maxScore = 1.0
    console.warn('Missing max score:', mainEdgeType, maxScore, originalEdges[0])
  }

  // filter by edge count
  edges = filterOld(originalEdges, maxEdgeCount)

  // Last element is always the minimum
  minScore = edges[edges.length - 1].data[mainEdgeType]

  if (minScore === undefined) {
    minScore = 0.0
    console.warn('Missing min score:', minScore)
  }

  if (parentScore === undefined) {
    edges = filterOld(originalEdges, maxEdgeCount)
  }

  network.data['allEdgeScoreRange'] = [minScore, maxScore]
  weightRange = weightRange.filter((val) => val > minScore)
  // Create colors for range.  0 is always global minimum
  const colorMap = generateColorMap(weightRange, 0, maxScore, parentScore)

  let barCount1 = 50
  let barCount2 = 50

  if (edges.length < 100) {
    barCount1 = 10
    barCount2 = 5
  }
  const allData = createBuckets(
    edges,
    minScore,
    maxScore,
    mainEdgeType,
    barCount1,
    true,
    colorMap,
  )

  const forHistogram = allData.result
  network.data['allEdgeScoreDist'] = forHistogram
  network.data['allEdgeMaxFrequency'] = allData.maxFrequency

  const subset = edges
  const subMin = minScore

  const subData = createBuckets(
    subset,
    subMin,
    maxScore,
    mainEdgeType,
    barCount2,
    true,
    colorMap,
  )
  network.data['subEdgeScoreDist'] = subData.result
  network.data['maxFrequency'] = subData.maxFrequency
  network.data['edgeScoreRange'] = [subMin, maxScore]
  network.data['edgeColorMap'] = colorMap

  const subsetLen = subset.length
  const nodeSet = new Set()

  const colorGenerator = d3Scale
    .scaleSequential(d3ScaleChromatic.interpolateInferno)
    .domain([subMin, maxScore])

  for (let i = 0; i < subsetLen; i++) {
    const edge = subset[i]
    // Assign color
    if (parentScore !== undefined && parentScore !== null) {
      // assignColor(colorMap, edge, mainEdgeType)
    } else {
      const weight = edge.data[mainEdgeType]
      let newColor = colorGenerator(weight)
      if (newColor === undefined) {
        newColor = DEF_COLOR
      }
      // edge.data['color'] = newColor
      edge.data['zIndex'] = calculateZindex(weight, edge, mainEdgeType)
    }
    nodeSet.add(edge.data.source)
    nodeSet.add(edge.data.target)
  }

  network.elements.edges = subset
  return network
}

const createBuckets = (
  edges,
  min,
  max,
  scoreFieldName,
  sliceCount = 200,
  coloring = false,
  colorMap,
) => {
  const colorScale = d3Scale
    .scaleSequential(d3ScaleChromatic.interpolateInferno)
    .domain([min, max])

  const range = max - min
  const delta = range / sliceCount

  let maxFrequency = 0

  let edgeCount = edges.length

  let curRange = min + delta
  let bucketCounter = 0
  const result = []
  while (edgeCount--) {
    const score = edges[edgeCount].data[scoreFieldName]

    if (score < curRange) {
      bucketCounter++
    } else {
      if (maxFrequency < bucketCounter) {
        maxFrequency = bucketCounter
      }

      let log10val = Math.log10(bucketCounter)
      if (log10val <= 0) {
        // for -infinity
        log10val = 0
      }
      const newBucket = { x: curRange, y: log10val }

      if (coloring && colorMap) {
        newBucket['color'] = getColorForRange(colorMap, curRange, min, max)
      } else if (coloring) {
        newBucket['color'] = colorScale(curRange)
      }

      result.push(newBucket)
      bucketCounter = 1
      curRange = curRange + delta
    }
  }

  if (result.length >= 2) {
    // Adjust bounds
    const b1 = result[0]
    const x1 = b1.x
    const color1 = b1.color

    const minColor = getColorForRange(colorMap, min, min, max)

    if (x1 > min && minColor !== color1) {
      result[0].color = minColor
    }

    // Last one
    const bLast = result[result.length - 1]
    const xLast = bLast.x
    const colorLast = bLast.color

    if (xLast > max || colorLast == null) {
      // Remove
      result.pop()
    }
  }

  return { result, maxFrequency }
}

export const createFilter = (network, maxEdgeCount) => {
  const filters = []
  // 1. Extract props from network data
  const edgeTypes = {}
  let mainEdgeType = network.data[MAIN_EDGE_TAG]
  if (mainEdgeType !== undefined) {
    mainEdgeType = mainEdgeType.replace(PATTERN, '_')
  }

  for (let [key, value] of Object.entries(network.data)) {
    if (key === MAIN_EDGE_TAG) {
      continue
    }

    const keyParts = key.split(' ')
    const suffix = keyParts[keyParts.length - 1]
    let realKey = keyParts.slice(0, keyParts.length - 1).join('_')
    const edgeTypeName = realKey.replace(PATTERN, '_')

    const currentValue = edgeTypes[edgeTypeName]
    if (currentValue === undefined) {
      const newEntry = {}
      newEntry[suffix] = value
      edgeTypes[edgeTypeName] = newEntry
    } else {
      currentValue[suffix] = value
      edgeTypes[edgeTypeName] = currentValue
    }
  }

  for (let [key, value] of Object.entries(edgeTypes)) {
    if (value.type === 'numeric') {
      const isPrimary = mainEdgeType === key

      let th = value.min
      let min = value.min
      let max = value.max

      filters.push({
        attributeName: key,
        min: min,
        max: max,
        value: min,
        isPrimary: isPrimary,
        enabled: isPrimary,
        type: 'continuous',
        threshold: th,
      })
    } else if (value.type === 'boolean') {
      filters.push({
        attributeName: key,
        isPrimary: false,
        enabled: false,
        type: 'boolean',
      })
    }
  }

  return [network, filters]
}

const createNodeFromPosition = (positions) => {
  const allGenes = Object.keys(positions)
  const duplicationMap = {}
  const topGroups = {}

  let idx = allGenes.length
  while (idx--) {
    const key = allGenes[idx]
    const value = positions[key]
    // gene name - group number
    const parts = key.split('-')
    const geneName = parts[0]
    const baseGroupNumber = value.base
    const groupNumber = parts[1]

    const groupList = duplicationMap[geneName] || []
    groupList.push(groupNumber)
    duplicationMap[geneName] = groupList

    // base grtoup - member genes
    topGroups[key] = baseGroupNumber
  }

  return { duplicationMap, topGroups }
}

/**
 *
 * Add extra nodes and edges shared by multiple groups
 *
 * @param {*} param0
 * @returns
 */
export const duplicateNodes = ({ network, nodeMap, allPositions }) => {
  const { nodes, edges } = network.elements
  const { duplicationMap, topGroups } = createNodeFromPosition(allPositions)

  let numNodes = nodes.length

  const newNodes = []
  const newEdges = []
  const pleioNodes = []
  const groupMembers = {}

  // Scan all original nodes
  while (numNodes--) {
    // Node to be tested (original node)
    const node = nodes[numNodes]

    // group IDs which have this node
    // const groupMembership = inGroups(node, groupMembers)
    const groupMembership = duplicationMap[node.data.name]

    // A gene is member of more than one group = need to be duplicated
    if (groupMembership.length > 1) {
      // Duplicated nodes from the original (does not include the original)
      const groupNodes = createNode(node, groupMembership, topGroups)
      // Add those to the id to node map
      addToNodeMap(nodeMap, groupNodes)

      // Store these as pleiotropic nodes
      pleioNodes.push(node)
      pleioNodes.push(...groupNodes)

      // Store as new nodes
      newNodes.push(...groupNodes)

      // Add edges for new nodes
      const newNormalEdges = addEdges({
        edges,
        originalNode: node,
        newNodes: groupNodes,
        nodeMap,
      })
      newEdges.push(...newNormalEdges)
    } else {
      // Add new name
      node.data.gName = `${node.data.name}-${groupMembership[0]}`
      node.data[BASE_GROUP_TAG] = topGroups[node.data.gName]
    }
  }
  const newNodeEdges = connectPleioNodes({
    newNodes: pleioNodes,
    allEdges: edges,
    nodeMap,
    groupMembers,
  })
  newEdges.push(...newNodeEdges)

  // Edges between duplicated nodes
  // const pleioEdges = addPleiotropicEdges(pleioNodes)
  // newEdges.push(...pleioEdges)
  return { newNodes, newEdges }
}

const connectPleioNodes = ({ newNodes, allEdges, nodeMap }) => {
  // All node names in this new set
  const nodeNames = new Set()
  const name2nodes = {}

  for (let node of newNodes) {
    const { name } = node.data
    nodeNames.add(name)
    const nodes = name2nodes[name] || []
    nodes.push(node)
    name2nodes[name] = nodes
  }

  const newEdges = []

  for (let edge of allEdges) {
    const sourceId = edge.data.source
    const targetId = edge.data.target
    const s = nodeMap.get(sourceId)
    const t = nodeMap.get(targetId)

    const sData = s.data
    const tData = t.data

    const sourceName = sData.name
    const targetName = tData.name

    const sGroup = sData[BASE_GROUP_TAG]
    const tGroup = tData[BASE_GROUP_TAG]

    // This only connectes pleiotropic nodes
    if (!s.data.isPleio || !t.data.isPleio || sGroup !== tGroup) {
      continue
    }

    // Both of the nodes are pleiotropic
    if (nodeNames.has(sourceName) && nodeNames.has(targetName)) {
      // This edge is preio and both source and target are in the new name set

      // Pick nodes
      const sourceNodes = name2nodes[sourceName]
      const targetNodes = name2nodes[targetName]
      for (let newSource of sourceNodes) {
        for (let newTarget of targetNodes) {
          // Finally, create edge
          const newId = `${newSource.data.id}-${newTarget.data.id}`
          const newEdge = {
            data: {
              ...edge.data,
              source: newSource.data.id,
              target: newTarget.data.id,
              id: newId,
            },
          }
          newEdges.push(newEdge)
        }
      }
    }
  }
  return newEdges
}

const addToNodeMap = (nodeMap, nodes) => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    const id = node.data.id
    nodeMap.set(id, node)
  }
  return nodeMap
}

// Copy existing edges
const addEdges = ({ edges, originalNode, newNodes, nodeMap }) => {
  const nodeData = originalNode.data
  const originalId = nodeData.id
  const originalNodeGroup = nodeData[BASE_GROUP_TAG]

  const newEdges = []

  // Scan all edges
  let numEdges = edges.length
  while (numEdges--) {
    const edge = edges[numEdges]
    const { data } = edge
    const { source, target } = data

    const sNode = nodeMap.get(source)
    const tNode = nodeMap.get(target)
    const sGroup = sNode.data[BASE_GROUP_TAG]
    const tGroup = tNode.data[BASE_GROUP_TAG]

    // Copy only edges between nodes in the same group
    if (sGroup !== tGroup) {
      continue
    }

    // This is a member edge
    // data['isMember'] = true

    // Copy edge if source or target is the original node
    if (source === originalId) {
      newEdges.push(...createEdge(originalNode, newNodes, edge))
    } else if (target === originalId) {
      newEdges.push(...createEdge(originalNode, newNodes, edge))
    }
  }

  return newEdges
}

const createEdge = (originalNode, newNodes, originalEdge) => {
  const { data } = originalNode
  const originalNodeId = data.id
  const { source, target } = originalEdge.data

  const edges = []
  const edgeDataStr = JSON.stringify(originalEdge.data)

  newNodes.forEach((newNode) => {
    const newNodeId = newNode.data.id
    if (source === originalNodeId) {
      const edgeData = JSON.parse(edgeDataStr)
      edgeData.source = newNodeId
      edgeData.target = target
      edgeData.id = `${newNodeId}-${target}`
      edgeData.isMember = true
      edgeData.zIndex = 9999
      const newEdge = {
        data: edgeData,
      }
      edges.push(newEdge)
    } else if (target === originalNodeId) {
      const edgeData = JSON.parse(edgeDataStr)
      edgeData.source = source
      edgeData.target = newNodeId
      edgeData.id = `${source}-${newNodeId}`
      edgeData.isMember = true
      edgeData.zIndex = 9999
      const newEdge = {
        data: edgeData,
      }
      edges.push(newEdge)
    }
  })
  return edges
}

/**
 * Add special edges between pleiotropic nodes
 *
 * @param {} nodes
 * @returns
 */
const addPleiotropicEdges = (nodes) => {
  const pleioEdges = []

  const usedNodes = new Set()

  let numNodes = nodes.length
  while (numNodes--) {
    const source = nodes[numNodes]
    const sourceData = source.data
    const sourceId = sourceData.id
    const sourceName = sourceData.name

    usedNodes.add(sourceId)

    let idx = nodes.length
    while (idx--) {
      const target = nodes[idx]
      const targetData = target.data
      const targetId = targetData.id
      const targetName = targetData.name
      if (
        sourceId === targetId ||
        sourceName !== targetName ||
        usedNodes.has(targetId)
      ) {
        continue
      }

      const newEdge = {
        data: {
          source: sourceId,
          target: targetId,
          id: `ep_${sourceId}_${targetId}`,
          isPleio: true,
          Score: 1.0,
          isMember: true,
          primary_edge_visible: true,
        },
      }

      pleioEdges.push(newEdge)
    }
  }
  return pleioEdges
}

const createNode = (originalNode, groupMembership, topGroups) => {
  const originalData = originalNode.data
  for (let key in originalData) {
    if (key.startsWith(GROUP_PREFIX)) {
      delete originalData[key]
    }
  }

  // Mark this as the pleio
  originalData[PLEIO_TAG] = true
  // Mark as original pleio
  originalData['isOriginal'] = true

  // Use first one to the original node
  originalData[GROUP_PREFIX + groupMembership[0]] = true
  originalData['gName'] = `${originalData.name}-${groupMembership[0]}`
  originalData[BASE_GROUP_TAG] = topGroups[originalData.gName]

  // Create new nodes for the rest of the groups
  const newNodes = []

  // Original node will be used as the first one, so starts with 1
  for (let idx = 1; idx < groupMembership.length; idx++) {
    const newData = {
      name: originalData.name,
    }
    const groupId = groupMembership[idx]
    newData[GROUP_PREFIX + groupId] = true
    newData['id'] = originalData.id + '-G' + groupId
    newData[PLEIO_TAG] = true
    newData['gName'] = `${originalData.name}-${groupId}`
    newData[BASE_GROUP_TAG] = topGroups[newData.gName]

    const newNode = {
      data: newData,
    }
    newNodes.push(newNode)
  }
  return newNodes
}
/**
 * Flatten the group membership to an array of group ids
 *
 * @param {*} node
 * @param {*} groupMembers
 * @returns
 */
const inGroups = (node, groupMembers = {}) => {
  const { data } = node
  const inGroup = []

  for (let key in data) {
    if (key.startsWith(GROUP_PREFIX)) {
      const isMember = data[key]
      const groupNumbers = key.split(':')
      const groupId = groupNumbers[1]
      if (isMember) {
        inGroup.push(groupId)
        const members = groupMembers[groupId] || new Set()
        members.add(data.id)
        groupMembers[groupId] = members
      }
    }
  }
  return inGroup
}
