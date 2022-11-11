import { cx2cyjs } from "../utils/ndex-util"

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
    searchDepth: 4
  }
  return getCyjs({searchUrl, query})
}

const getNeighborhood = async ({url, uuid, genes=[] }) => {

  const searchUrl = `${url}${uuid}/query`
  const query = {
    searchString: genes.join(' '),
    searchDepth: 2,
    directOnly: false
  }

  return getCyjs({searchUrl, query})
}

const getCyjs = async ({searchUrl, query}) => {
  const response = await fetch(searchUrl, {
    method: METHOD_POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(query)
  })

  const cx = await response.json()
  return cx2cyjs(cx)

}

export { getNetwork, getInterconnection, getNeighborhood }
