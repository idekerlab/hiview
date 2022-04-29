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

const insertEdgeColorMapping = ({edges, vs, attrName, scoreMin, scoreMax}) => {
  const vsClone = Object.assign(vs)
  const colorScale = getColorScaleInferno({min: scoreMin, max: scoreMax})
  
  assignColor(edges, attrName, colorScale)

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

const assignColor = (edges, attrName, colorScale) => {



  edges.forEach(e => {
    const {data} = e
    const value = data[attrName]
    data['color'] = colorScale(value)
  })
}

export { insertNodeColorMapping, insertEdgeColorMapping }
