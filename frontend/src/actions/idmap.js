export const FETCH_IDMAP = 'FETCH_IDMAP'
const fetchIdmap = ids => {
  return {
    type: FETCH_IDMAP,
    ids
  }
}


export const RECEIVE_IDMAP = 'RECEIVE_IDMAP'
const receiveIdmap = (ids, json) => {

  console.log("*** Property Fetch Result ***")
  console.log(json)

  return {
    type: RECEIVE_IDMAP,
    ids,
    data: json
  }
}


const fetchIdmapfromMyGene = ids => {
  const myGene = 'http://mygene.info/v3/query?q='
  const geneStr = '"' + ids.join() + '"'

  const url = myGene + geneStr
  return fetch(url, {method: "POST"})
}


export const convertIds = ids => {

  return dispatch => {
    dispatch(fetchIdmap(ids))

    return fetchIdmap(ids)
      .then(response => (response.json()))
      .then(json =>
        dispatch(receiveIdmap(ids, json))
      )
  }
}

export const CLEAR_IDMAP = 'CLEAR_IDMAP'
export const clearIdmap = () => {
  return {
    type: CLEAR_IDMAP,
    ids: null,
    data: {}
  }
}
