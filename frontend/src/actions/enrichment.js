import { createAction } from 'redux-actions'

const BASE_URL = 'https://maayanlab.cloud/Enrichr'

const ADD_LIST_API = `${BASE_URL}/addList`

const backgrounds = [
  'GO_Biological_Process_2018',
  'GO_Cellular_Component_2018',
  'GO_Molecular_Function_2018',
  'KEGG_2019_Human',
  'Reactome_2016',
  'WikiPathways_2019_Human',
  'Human_Phenotype_Ontology',
  'Jensen_DISEASES'
]

export const SEND_GENE_LIST = 'SEND_GENE_LIST'
export const RECEIVE_ANALYSIS_RESULT = 'RECEIVE_ANALYSIS_RESULT'
export const ADD_GENE_LIST = 'ADD_GENE_LIST'
export const CLEAR_GENE_LIST = 'CLEAR_GENE_LIST'

export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

const sendGeneList = (url, genes, subsystemId) => {
  console.log('* Enrichment analysis start:', genes)
  return {
    type: SEND_GENE_LIST,
    url,
    genes,
    result: null,
    running: true,
    subsystemId
  }
}

const receiveAnalysisResult = (url, result, subsystemId) => {
  console.log('* Enrichment analysis end:', result)
  return {
    type: RECEIVE_ANALYSIS_RESULT,
    url,
    running: false,
    result,
    subsystemId
  }
}

const send = (url, genes) => {
  const geneString = genes.reduce((gene1, gene2) => gene1 + '\n' + gene2)
  const data = new FormData()
  data.append('list', geneString)
  data.append('description', 'HiView gene list')

  const settings = {
    method: 'POST',
    mode: 'cors',
    body: data
  }
  // Return promise
  return fetch(ADD_LIST_API, settings)
}

const parallelCall = (url, jobId) => {
  const settings = {
    method: 'GET',
    mode: 'cors'
  }

  const tasks = backgrounds.map(bg =>
    fetch(`${BASE_URL}/enrich?userListId=${jobId}&backgroundType=${bg}`, settings).then(response => response.json())
  )

  return tasks
}

export const runEnrichment = (url = ADD_LIST_API, genes, subsystemId) => {
  return dispatch => {
    // Set state to "running"
    dispatch(sendGeneList(url, genes, subsystemId))

    return send(url, genes)
      .then(response => {
        if(!response.ok) {
          return dispatch(receiveAnalysisResult(url, null, subsystemId)) 
        }
        return response.json()
      })
      .then(json => {
        const jobId = json.userListId
        const tasks = parallelCall(url, jobId)
        Promise.all(tasks)
          .then(allResult => {
            const resultMap = {}
            allResult.forEach(entry => {
              const key = Object.keys(entry)[0]
              resultMap[key] = entry[key]
            })
            return resultMap
          })
          .then(result =>
            dispatch(receiveAnalysisResult(url, result, subsystemId))
          )
      })
  }
}

export const addGeneList = createAction(ADD_GENE_LIST)
export const clearGeneList = createAction(CLEAR_GENE_LIST)

export const setErrorMessage = createAction(SET_ERROR_MESSAGE)