export const METHOD_GET = 'GET'

const getNetwork = (url, uuid) => {
  const importNetworkUrl = url + '/network/' + uuid

  return fetch(importNetworkUrl, {
    method: METHOD_GET,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export { getNetwork }
