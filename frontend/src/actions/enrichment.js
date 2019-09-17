import { createAction } from 'redux-actions'

const ENRICHR_URL = 'http://amp.pharm.mssm.edu/Enrichr/addList'

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

const sendGeneList = (url, genes, subsystemId) => ({
  type: SEND_GENE_LIST,
  url,
  genes,
  result: null,
  running: true,
  subsystemId
})

const receiveAnalysisResult = (url, result, subsystemId) => ({
  type: RECEIVE_ANALYSIS_RESULT,
  url,
  running: false,
  result,
  subsystemId
})

const send = (url, genes) => {
  const geneString = genes.reduce((gene1, gene2) => gene1 + '\n' + gene2)
  const data = new FormData()
  data.append('list', geneString)
  data.append('description', 'HiView gene list')

  const settings = {
    method: 'POST',
    body: data
  }
  // Return promise
  return fetch(ENRICHR_URL, settings)
}

const parallelCall = (url, jobId) => {
  const tasks = backgrounds.map(bg =>
    fetch(
      'http://amp.pharm.mssm.edu/Enrichr/enrich?userListId=' +
        jobId +
        '&backgroundType=' +
        bg
    ).then(response => response.json())
  )

  return tasks
}

export const runEnrichment = (url = ENRICHR_URL, genes, subsystemId) => {
  return dispatch => {
    // Set state to "running"
    dispatch(sendGeneList(url, genes, subsystemId))

    return send(url, genes)
      .then(response => {
        return response.json()
      })
      .then(json => {
        const jobId = json.userListId
        const tasks = parallelCall(url, jobId)
        Promise.all(tasks)
          .then(allResult => {

            console.log('ENR ALL', allResult)
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
