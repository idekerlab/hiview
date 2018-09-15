import * as d3Scale from 'd3-scale'
export const MAIN_EDGE_TAG = 'Main Feature'
export const PATTERN = /[ -]/g

const createHistogramModel = () => {}

const compareBy = fieldName => (a, b) => {
  const scoreA = a.data[fieldName]
  const scoreB = b.data[fieldName]

  let comparison = 0
  if (scoreA > scoreB) {
    comparison = -1
  } else if (scoreA < scoreB) {
    comparison = 1
  }
  return comparison
}

const filter = (edges, scoreName, min) => {
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
      edge.data[score]
      subset.push(edge)
    }
  }

  return subset
}

const generateColorMap = (weightRange, minVal, maxVal) => {
  const colorScale = d3Scale
    .scaleSequential(d3Scale.interpolateInferno)
    .domain([minVal, maxVal])

  const slots = weightRange.length
  let idx = slots
  const colorMap = []




  console.log('Range = ', weightRange, minVal, maxVal)
  //First entry

  colorMap.push({
    min: minVal,
    max: weightRange[idx-1],
    color: '#888888'
  })
  while (idx--) {
    const v1 = weightRange[idx]
    const v2 = weightRange[idx - 1]
    const diff = v2 - v1
    console.log(idx + " : Val & diff = ", v1, v2, diff, slots)

    let color = ''
    if (diff === 0) {
      color = colorScale(v1)
      colorMap.push({
        min: v1,
        max: v1,
        color
      })
    } else {
      // const midPoint = v1 + diff / 2
      color = colorScale(v2)

      console.log(color, minVal, maxVal)
      colorMap.push({
        min: v1,
        max: v2,
        color
      })
    }

    if (idx === 1) {
      // Last one
      colorMap.push({
        min: v2,
        max: maxVal,
        color: colorScale(maxVal)
      })
      break
    }
  }


  console.log('COL map = ', weightRange, colorMap)

  return colorMap
}

const assignColor = (colorMap, edge, primaryName, min) => {
  let color = '#888888'
  const weight = edge.data[primaryName]

  for (let i = 0; i < colorMap.length; i++) {
    const mapEntry = colorMap[i]
    // console.log('score: ', weight, mapEntry)

    if (mapEntry.min <= weight && weight <= mapEntry.max) {
      color = mapEntry.color
      break
    }
  }

  edge.data['color'] = color
}

export const filterEdge = (network, maxEdgeCount) => {
  let mainEdgeType = network.data[MAIN_EDGE_TAG]
  if (mainEdgeType !== undefined) {
    mainEdgeType = mainEdgeType.replace(/ /g, '_')
  }
  const networkData = network.data

  console.log('*** Network data', networkData)

  const parentScore = networkData['Parent weight']
  const childrenWeight = networkData['Children weight']
  const weightRange = childrenWeight.split('|').map(val => Number(val))

  const nodes = network.elements.nodes
  const originalEdges = network.elements.edges

  const edges = filter(originalEdges, mainEdgeType, Number(parentScore))

  const t0 = performance.now()
  edges.sort(compareBy(mainEdgeType))
  const t1 = performance.now()
  console.log('Edge Sort TIME = ', t1 - t0, edges)

  const maxScore = Number(edges[0].data[mainEdgeType])
  const minScore = Number(parentScore)
  network.data['allEdgeScoreRange'] = [minScore, maxScore]

  const colorMap = generateColorMap(weightRange, minScore, maxScore)

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
    barCount1
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
    true
  )
  network.data['subEdgeScoreDist'] = subData.result
  network.data['maxFrequency'] = subData.maxFrequency
  network.data['edgeScoreRange'] = [subMin, maxScore]

  const subsetLen = subset.length
  const nodeSet = new Set()

  for (let i = 0; i < subsetLen; i++) {
    const edge = subset[i]
    // Assign color
    assignColor(colorMap, edge, mainEdgeType)

    nodeSet.add(edge.data.source)
    nodeSet.add(edge.data.target)
  }

  let j = nodes.length
  const newNodes = new Array(nodeSet.size)

  let idx = 0
  while (j--) {
    const node = nodes[j]
    if (nodeSet.has(node.data.id)) {
      newNodes[idx] = node
      idx++
    }
  }
  network.elements.edges = subset
  network.elements.nodes = newNodes
  return network
}

const createBuckets = (
  edges,
  min,
  max,
  scoreFieldName,
  sliceCount = 200,
  coloring = false
) => {
  const colorScale = d3Scale
    .scaleSequential(d3Scale.interpolateInferno)
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
      const newBucket = { x: curRange.toString(), y: Math.log10(bucketCounter) }
      if (coloring) {
        newBucket['color'] = colorScale(curRange)
      }
      result.push(newBucket)
      bucketCounter = 1
      curRange = curRange + delta
    }
  }

  return { result, maxFrequency }
}

export const createFilter = (network, maxEdgeCount) => {
  const defCutoff = network.data['Parent weight']

  const filters = []

  const edges = network.elements.edges
  let edgeCount = edges.length

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
        threshold: th
      })
    } else if (value.type === 'boolean') {
      filters.push({
        attributeName: key,
        isPrimary: false,
        enabled: false,
        type: 'boolean'
      })
    }
  }

  return [network, filters]
}
