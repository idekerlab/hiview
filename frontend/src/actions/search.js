

export const SEARCH = 'SEARCH'

const search = (query, options) => {
  return {
    type: SEARCH,
    query,
    options
  }
}


export const RECEIVE_SEARCH_RESULT = 'RECEIVE_SEARCH_RESULT'
const receiveSearchResult = (query, json, options) => {

  return {
    type: RECEIVE_SEARCH_RESULT,
    query,
    options,
    result: json
  }
}


export const CLEAR_SEARCH_RESULT = 'CLEAR_SEARCH_RESULT'
const clearSearchResult = () => {
  return {
    type: CLEAR_SEARCH_RESULT,
    result: {}
  }
}


const sendQuery = (query, options) => {
  const baseUrl = options.baseUrl
  const uuid = options.uuid

  const url = baseUrl + uuid + '/nodes'

  const payload = {
    'searchString': 'nodeName:' + query
  }

  return fetch(url, {
    mode: 'cors',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })

}



export const clear = () => {
  return dispatch => {
    dispatch(clearSearchResult())
  }
}

const toIdList = (json) => (json.map(entry => (entry.id)))

export const searchNdex = (query, options) => {

  return dispatch => {
    dispatch(search(query, options))

    return sendQuery(query, options)
      .then(response => (response.json()))
      .then(json => (toIdList(json)))
      .then(idList =>
        dispatch(receiveSearchResult(query, idList, options))
      )
  }
}


