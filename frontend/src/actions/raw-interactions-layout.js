import cytoscape from 'cytoscape'
import regCose from 'cytoscape-cose-bilkent'
import { scaleBand } from 'd3-scale'
import { setGroupPositions } from './raw-interactions'
regCose(cytoscape)

const genePositionScalingX = 1.2
const genePositionScalingY = 1.2

const getNameMap = nodeMap => {
  const nameMap = {}
  nodeMap.forEach(node => {
    const {data} = node
    const name = data.name
    nameMap[name] = node
  })
  return nameMap
}

const setGenePositions = ({nodeMap, positions}) => {
  const name2node = getNameMap(nodeMap)

  for(let key in positions) {
    const position = positions[key]
    const node = name2node[key]
    node.position.x = position.x * genePositionScalingX
    node.position.y = position.y * genePositionScalingY
  }
}

/**
 * 
 * Modify original layout based on Circle Packing
 * 
 * @param {*} network 
 * @param {*} groups 
 * @param {*} positions - key is "name," value is {x, y}
 * @param {*} nodeMap - key is "node id", value is node
 */
const localLayout = (network, groupsMap, positions, nodeMap) => {

  let groups = groupsMap
  // Case 1: gene only node - no nested structure.
  if(groupsMap === null || groupsMap === undefined) {
    setGenePositions({nodeMap, positions})
    return
  }

  // Headless instance of Cyjs
  const cy = cytoscape({
    headless: true,
    elements: network.elements
  })

  const groupNames = Object.keys(groups)
  const remainingGenes = []

  // Sort from largest to smallest
  const sizeMap = new Map()
  groupNames.forEach(name => {
    sizeMap.set(name, groups[name].length)
  })

  const sorted = [...sizeMap.entries()].sort((a, b) => b[1] - a[1])

  // Empty collection for group nodes
  const groupNodes = cy.collection()

  sorted.forEach(entry => {
    const groupName = entry[0]
    const position = positions[groupName]
    const positionMembers = positions[groupName + '-members']

    // Member genes assigned to the group
    const memberIds = groups[groupName]

    if (memberIds == undefined || memberIds == null || memberIds.length === 0) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!', groupName)
    } else if (memberIds.length === 1) {
      remainingGenes.push(memberIds[0])
      const node = nodeMap.get(memberIds[0])
      node['position'] = {
        x: position.x * genePositionScalingX,
        y: position.y * genePositionScalingY
      }
    } else {
      memberIds.forEach(memberId => {
        let node = nodeMap.get(memberId)
        if(node === undefined) {
          console.log('node not found', memberId)
        } else {
          const {name} = node.data
          const childPosition = positionMembers[name]
          if(childPosition === undefined && position !== undefined) {
            node['position'] = {
              x: position.x * genePositionScalingX, 
              y: position.y * genePositionScalingY

            }
          } else {
            node['position'] = {
              x: childPosition.x * genePositionScalingX,
              y: childPosition.y * genePositionScalingY 
            }
          }
        }
      })
    }
  })
}

export { localLayout }
