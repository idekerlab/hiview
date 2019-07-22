export const METHOD_POST = 'POST'

const NETANT_BASE_URL = 'http://diseasescope.ucsd.edu/netant/'


const postGenes = (payload) => {
  const postGenesUrl =
    NETANT_BASE_URL + ':' + cyRESTPort + '/cyndex2/v1/networks/cx'

  return fetch(importNetworkUrl, {
    method: METHOD_POST,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export { postGenes }
