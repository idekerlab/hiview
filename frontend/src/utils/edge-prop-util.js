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
