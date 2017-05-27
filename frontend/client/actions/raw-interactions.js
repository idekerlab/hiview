export const FETCH_INTERACTIONS = 'FETCH_INTERACTIONS'
const fetchNetwork = url => {
  return {
    type: FETCH_INTERACTIONS,
    url
  }
}


export const RECEIVE_INTERACTIONS = 'RECEIVE_INTERACTIONS'
const receiveNetwork = (url, json) => {
  return {
    type: RECEIVE_INTERACTIONS,
    url,
    network: json
  }
}

const fetchNet = url => {
  return fetch(url)
}

export const fetchInteractionsFromUrl = url => {
  return dispatch => {
    dispatch(fetchNetwork(url))

    return fetchNet(url)
      .then(response => (response.json()))
      .then(json =>
        dispatch(receiveNetwork(url, json))
      )
  }
}
