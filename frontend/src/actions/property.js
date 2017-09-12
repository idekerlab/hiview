import config from '../assets/config.json'

export const FETCH_PROPERTY = 'FETCH_PROPERTY'
const fetchProperty = (id, url, propType) => {
  return {
    type: FETCH_PROPERTY,
    url,
    id,
    propType
  }
}


export const RECEIVE_PROPERTY = 'RECEIVE_PROPERTY'
const receiveProperty = (id, url, json, propType) => {

  console.log("*** Property Fetch Result ***")
  console.log(json)

  return {
    type: RECEIVE_PROPERTY,
    url,
    id,
    propType,
    data: json
  }
}


const fetchProp = url => {
  return fetch(url)
}


export const fetchPropertyFromUrl = (id, url, propType) => {

  return dispatch => {
    dispatch(fetchProperty(id, url, propType))

    return fetchProp(url)
      .then(response => (response.json()))
      .then(json =>
        dispatch(receiveProperty(id, url, json, propType))
      )
  }
}

export const setProperty = (id, props, propType) => {
  console.log("*** Directly set props for the term ***")
  console.log(props)

  return {
    type: RECEIVE_PROPERTY,
    id,
    propType,
    url: null,
    data: props
  }

}

export const CLEAR_PROPERTY = 'CLEAR_PROPERTY'
export const clearProperty = () => {
  return {
    type: CLEAR_PROPERTY,
    id: null,
    url: null,
    propType: null,
    data: {}
  }
}
