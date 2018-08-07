import { createAction } from 'redux-actions'
import axios from 'axios'

const ENRICHR_URL = 'http://amp.pharm.mssm.edu/Enrichr/addList'

const backgrounds = [
  'GO_Biological_Process_2018',
  'GO_Cellular_Component_2018',
  'GO_Molecular_Function_2018',
  'KEGG_2016',
  'Reactome_2016',
  'WikiPathways_2016',
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
  console.log(geneString)
  const postUrl = 'http://amp.pharm.mssm.edu/Enrichr/addList'

  const data = new FormData()
  data.append('list', geneString)
  data.append('description', 'test2')

  // Return promise
  return axios({
    method: 'post',
    url: postUrl,
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

const parallelCall = (url, jobId) => {
  const tasks = backgrounds.map(bg =>
    axios.get(
      'http://amp.pharm.mssm.edu/Enrichr/enrich?userListId=' +
        jobId +
        '&backgroundType=' +
        bg
    )
  )

  return tasks
}

export const runEnrichment = (
  url = ENRICHR_URL,
  genes,
  subsystemId
) => {
  return dispatch => {
    // Set state to "running"
    dispatch(sendGeneList(url, genes, subsystemId))

    return send(url, genes)
      .then(response => {
        return response.data.userListId
      })
      .then(jobId => {
        const tasks = parallelCall(url, jobId)
        Promise.all(tasks)
          .then(allResult => {
            const resultMap = {}
            allResult.forEach(entry => {
              const result = entry.data
              const key = Object.keys(result)[0]
              const value = result[key]
              resultMap[key] = value
            })
            return resultMap
          })
          .then(result =>
            dispatch(receiveAnalysisResult(url, result, subsystemId))
          )
      })
  }
}


const getResult = (jobId) => {

}

export const addGeneList = createAction(ADD_GENE_LIST)
export const clearGeneList = createAction(CLEAR_GENE_LIST)
