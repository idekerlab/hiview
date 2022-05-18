import { getInterconnection } from '../api/ndex'

const NDEX_API = '.ndexbio.org/v2/search/network/'


export const FETCH_INTERCONNECTION = 'FETCH_INTERCONNECTION'
const fetchInterconnection = () => {
  return {
    type: FETCH_INTERCONNECTION,
    paths: new Map(),
  }
}

export const RECEIVE_INTERCONNECTION = 'RECEIVE_INTERCONNECTION'
const receiveInterconnection = (paths) => {
  return {
    type: RECEIVE_INTERCONNECTION,
    paths
  }
}


export const queryPaths = ({ uuidMap, serverType, genes = [] }) => {
  return (dispatch) => {
    const url = `https://${serverType}${NDEX_API}`

    dispatch(fetchInterconnection({ uuidMap }))

    return downloadPaths({ dispatch, uuidMap, url, genes })
  }
}

const downloadPaths = async ({ dispatch, uuidMap, url, genes }) => {
  
  const pathMap = new Map()
  const tasks = []
  for (const [key, value] of uuidMap.entries()) {
    const task = await getInterconnection({ url, uuid: value, genes })
    pathMap.set(key, task)
    tasks.push(task)
  }

  const results = await Promise.all(tasks)

  console.log(results)

  return await dispatch(receiveInterconnection(pathMap))
}
