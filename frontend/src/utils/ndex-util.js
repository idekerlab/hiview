import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'

const utils = new CyNetworkUtils()
const cx2js = new CxToJs(utils)
const cx2cyjs = (cx) => {
  if (cx === undefined || cx === null) {
    return null
  }

  let niceCX = utils.rawCXtoNiceCX(cx)
  const attributeNameMap = {}
  const elementsObj = cx2js.cyElementsFromNiceCX(niceCX, attributeNameMap)

  return {
    data: {
      name: 'path'
    },
    elements: elementsObj,
  }
}

export { cx2cyjs }
