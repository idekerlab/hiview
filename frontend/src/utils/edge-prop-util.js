export const parseProps = (encodedJson) => {
  // validate
  if (
    encodedJson === undefined ||
    encodedJson === null ||
    typeof encodedJson !== 'string' ||
    encodedJson.length === 0
  ) {
    return null
  }

  let parsedVal = null
  try {
    parsedVal = JSON.parse(encodedJson)
  } catch (error) {
    return null
  }

  return parsedVal
}

export const convertProps = (json) => {
  // validate
  if (
    json === undefined ||
    json === null
  ) {
    return null
  }

  return updateStructure(json)
}

const TAGS = {
  class: 'class',
  zScore: 'z-score',
  shap: 'shap'
}

const updateStructure = (parsedVal) => {
  const class2Vals = {}
  for (const key in parsedVal) {
    const val = parsedVal[key]
    const className = val[TAGS.class]
    delete val[TAGS.class]

    const classList = class2Vals[className] || []
    classList.push(val)
    class2Vals[className] = classList
  }
  return class2Vals
}