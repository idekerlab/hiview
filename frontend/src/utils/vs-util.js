import { getColor10 } from './color-util'

const insertNodeColorMapping = (vs, keyAttrName, attrValues) => {
  if (
    vs === null ||
    vs === undefined ||
    keyAttrName === undefined ||
    keyAttrName === null ||
    Array.isArray(attrValues) === false ||
    attrValues.length === 0
  ) {
    return
  }

  const valueLen = attrValues.length
  const vsClone = Object.assign(vs)
  
  for (let idx = 0; idx < valueLen; idx++) {
    const color = getColor10(idx)
    const attrSelector = {
      selector: `node[${keyAttrName} = '${attrValues[idx]}']`,
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
    selector: "node['pleio']",
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
          return 'diamond'
        }

        return 'roundrectangle'
      }
    },
  }
  vsClone.style.push(shapeAttrSelector)

  return vsClone
}

export { insertNodeColorMapping }
