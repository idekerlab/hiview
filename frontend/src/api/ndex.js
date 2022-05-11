export const METHOD_GET = 'GET'
export const METHOD_POST = 'POST'


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

const getInterconnection = async ({url, uuid, genes=[] }) => {

  const searchUrl = `${url}${uuid}/interconnectquery`
  const query = {
    searchString: genes.join(' '),
    searchDepth: 1
  }

  const response = await fetch(searchUrl, {
    method: METHOD_POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  })

  const json = await response.json()

  return json

}

export { getNetwork, getInterconnection }
