import {METHOD_GET} from "./cyrest";

export const METHOD_POST = 'POST'

const NETANT_BASE_URL = 'http://secret.ndexbio.org/netant/netant/v1'

const postGenes = payload => {
  console.log('GENE LIST STR = ', payload)
  const url = new URL(NETANT_BASE_URL)
  const params = {
    disease: 'inflamm',
    gene: payload,
    ndexname: 'NetAnt Result from HiView'
  }
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const headers = new Headers()
  headers.append('Content-Type','application/x-www-form-urlencoded')
  headers.append('accept', 'application/json')

  return fetch(url, {
    method: METHOD_POST,
    mode: 'cors',
    headers: headers,
    body: 'disease=cancer&gene=tp53&ndexname=NetAnt result from HiView'
  })
}

const checkStatus = jobId => {
  const statusUrl = NETANT_BASE_URL + '/' + jobId
  return fetch(statusUrl, {
    method: METHOD_GET
  })
}


export { postGenes, checkStatus }
