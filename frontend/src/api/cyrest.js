export const METHOD_POST = 'POST'
export const METHOD_GET = 'GET'

const CYREST_BASE_URL = 'http://127.0.0.1'

const checkStatus = cyRESTPort => {
  const statusUrl = CYREST_BASE_URL + ':' + cyRESTPort + '/v1'
  return fetch(statusUrl, {
    method: METHOD_GET
  })
}

const postNetwork = (cyRESTPort, payload) => {
  const url =
    CYREST_BASE_URL + ':' + cyRESTPort + '/cyndex2/v1/networks/cx'

  return fetch(url, {
    method: METHOD_POST,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export { checkStatus, postNetwork }
