import { getColor10, getColorScaleInferno } from './color-util'

const insertNodeColorMapping = (vs, keyAttrName, attrValues) => {
  if (
    vs === null ||
    vs === undefined ||
    keyAttrName === undefined ||
    keyAttrName === null 
    // Array.isArray(attrValues) === false ||
    // attrValues.length === 0
  ) {
    return
  }

  const sortedValues = attrValues.sort()
  const valueLen = sortedValues.length
  const vsClone = Object.assign(vs)
  
  for (let idx = 0; idx < valueLen; idx++) {
    let color = getColor10(idx)
    const attrVal = sortedValues[idx]
    const attrSelector = {
      selector: `node[${keyAttrName} = "${attrVal}"]`,
      css: {
        'text-background-color': color,
        'text-background-opacity': 1,
        'text-outline-width': 0.5,
        'background-opacity': 1,
        'background-color': color,
      },
    }
    vsClone.style.push(attrSelector)
  }

  // Node shape mappings for pleio
  const shapeAttrSelector = {
    selector: "node[pleio]",
    css: {

      'background-opacity': 0.9,
      'text-background-opacity': 0,
      'shape': (ele) => {
        const val = ele.data('pleio')
        if(val === undefined) {
          return 'roundrectangle'
        }

        const numericVal = Number.parseInt(val)
        if(Number.isInteger(numericVal) && numericVal > 1) {
          return 'ellipse'
        }

        return 'roundrectangle'
      }
    },
  }
  vsClone.style.push(shapeAttrSelector)
  return vsClone
}

const insertEdgeColorMapping = ({nodes, edges, vs, attrName, scoreMin, scoreMax, threshold=0.0, metadata}) => {
  const vsClone = Object.assign(vs)
  const colorScale = getColorScaleInferno({min: scoreMin, max: scoreMax})
  
  assignColor(nodes, edges, attrName, colorScale, threshold, metadata.edgeColorMap)

  // Standard color mapping only for DDRAM
  // const edgeColorMapping =  {
  //   selector: `edge[${attrName}]`,
  //   css: {
  //     'line-color': ele => colorScale(ele.data(attrName))
  //   },
  // }
  
  const edgeColorMapping =  {
    selector: `edge[${attrName}]`,
    css: {
      'line-color': `data(color)`
    },
  }

  vsClone.style.push(edgeColorMapping)
  return vsClone
}


const GROUP_PREFIX = 'Group:'
const getMemberInfo = (nodes, positions) => {
  const groups = new Map()
  
  nodes.forEach(node => {
    const {data} = node

    for (let key in data) {
      if (key.startsWith(GROUP_PREFIX)) {
        const isMember = data[key]
        const groupNumbers = key.split(':')
        const groupId = groupNumbers[1]
        const memberSet = groups.get(groupId)
        if (isMember) {
          if (memberSet === undefined) {
            const memberSet = new Set()
            memberSet.add(data.id)
            groups.set(groupId, memberSet)
          } else {
            memberSet.add(data.id)
            groups.set(groupId, memberSet)
          }
        }
      }
    }
  })

  return groups
}


const getGroupEdgeColor = (edge, groups) => {
  const {data} = edge
  const {source, target} = data
  let color = null

  let index = 0
  groups.forEach((value) => {
    const memberSet = value
    if (memberSet.has(source.toString()) && memberSet.has(target.toString())) {
      if(color === null) {
        color = getColor10(index)
      }
    }
    index++
  })

  return color
}

const assignColor = (nodes, edges, attrName, colorScale, threshold=0.5) => {

  const groups = getMemberInfo(nodes)

  edges.forEach(e => {
    const {data} = e
    const value = data[attrName]
    const memberColor = getGroupEdgeColor(e, groups)
    
    if (memberColor !== null) {
      data['isMember'] = true
      data['color'] = memberColor
      // data['color'] = colorScale(value)
      data['zIndex'] = 5000
    } else if(value<threshold) {
      data['color'] = 'rgba(80,80,80,0.1)'
      // data['color'] = colorScale(value)
    } else {
      data['color'] = 'rgba(80,80,80,0.1)'
      // data['color'] = colorScale(value)
    }
    if(data['isPleio']) {
      data['color'] = '#FFFFFF'
      data['zIndex'] = 8000
    }
  })
}

export { insertNodeColorMapping, insertEdgeColorMapping }
