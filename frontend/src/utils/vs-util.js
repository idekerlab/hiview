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
  return vsClone
}

export { insertNodeColorMapping }
