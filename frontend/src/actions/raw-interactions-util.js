import * as d3Scale from 'd3-scale'
export const MAIN_EDGE_TAG = 'Main Feature'

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

export const sortEdges = (network, maxEdgeCount) => {
  let mainEdgeType = network.data[MAIN_EDGE_TAG]
  if (mainEdgeType !== undefined) {
    mainEdgeType = mainEdgeType.replace(/ /g, '_')
  }
  const nodes = network.elements.nodes
  const edges = network.elements.edges

  const t0 = performance.now()
  edges.sort(compareBy(mainEdgeType))
  const t1 = performance.now()
  console.log('Edge Sort TIME = ', t1 - t0)

  const maxScore = edges[0].data[mainEdgeType]
  const minScore = edges[edges.length - 1].data[mainEdgeType]
  network.data['allEdgeScoreRange'] = [minScore, maxScore]

  let barCount1 = 100
  let barCount2 = 50

  if (edges.length < 100) {
    barCount1 = 10
    barCount2 = 5
  }
  const t2 = performance.now()
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

  const subset = edges.slice(0, maxEdgeCount)
  const subMin = subset[subset.length - 1].data[mainEdgeType]

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
