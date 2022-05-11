import { getInterconnection } from '../api/ndex'

const NDEX_API = '.ndexbio.org/v2/search/network/'


export const FETCH_INTERCONNECTION = 'FETCH_INTERCONNECTION'
const fetchInterconnection = ({ uuid }) => {
  return {
    type: FETCH_INTERCONNECTION,
    uuid,
  }
}

export const RECEIVE_INTERCONNECTION = 'RECEIVE_INTERCONNECTION'
const receiveInterconnection = (results) => {
  return {
    type: RECEIVE_INTERCONNECTION,
    network: results,
  }
}

export const queryPaths = ({ uuidMap, serverType, genes = [] }) => {
  return (dispatch) => {
    const url = `http://${serverType}${NDEX_API}`

    dispatch(fetchInterconnection({ uuidMap }))

    return downloadPaths({ dispatch, uuidMap, url, genes })
  }
}

const downloadPaths = async ({ dispatch, uuidMap, url, genes }) => {
  
  const tasks = []
  for (const [key, value] of uuidMap.entries()) {
    const task = await getInterconnection({ url, uuid: value, genes })
    tasks.push(task)
  }

  const results = await Promise.all(tasks)

  console.log(results)

  return await dispatch(receiveInterconnection(results))
}
