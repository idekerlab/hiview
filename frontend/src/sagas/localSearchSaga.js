import { all, call, put, takeLatest } from 'redux-saga/effects'
import { SEARCH_MODE } from '../reducers/ui-state'

import {
  LOCAL_SEARCH_FAILED,
  LOCAL_SEARCH_SUCCEEDED,
  LOCAL_SEARCH_STARTED
} from '../actions/local-search'

export default function* localSearchSaga() {
  yield takeLatest(LOCAL_SEARCH_STARTED, watchSearch)
}

function* watchSearch(action) {
  let { geneIndex, systemIndex } = action.payload.index
  let query = action.payload.query
  const searchMode = action.payload.searchMode

  let index = geneIndex
  if (searchMode === SEARCH_MODE.FUZZY) {
    index = systemIndex
  }

  const matches = query.match(/"[^']*"/g)
  const removed = query.replace(/"[^']*"/g, '')
  let queryArray = removed.split(/ +/)

  let phrases = []

  if (matches !== null && matches.length !== 0) {
    phrases = matches.map(entry => entry.replace(/"/g, ''))
  }

  queryArray = [...queryArray, ...phrases]

  let resArray = []

  try {
    let len = queryArray.length

    // Run search for each word
    while (len--) {
      const geneSymbol = queryArray[len]
      const results = index.search(geneSymbol)
      resArray = [...resArray, ...results]
    }

    yield put({
      type: LOCAL_SEARCH_SUCCEEDED,
      payload: {
        results: filterResult(queryArray, resArray, searchMode)
      }
    })
  } catch (e) {
    console.warn('Local search error:', e)
    yield put({
      type: LOCAL_SEARCH_FAILED,
      payload: {
        message: 'Local search error',
        query: query,
        error: e.message
      }
    })
  }
}

const filterResult = (queryArray, results, searchMode) => {
  if (searchMode === SEARCH_MODE.EXACT) {
    const qSet = new Set(queryArray.map(q => q.toUpperCase()))
    return results.filter(res => qSet.has(res.Display_Label))
  } else if (searchMode === SEARCH_MODE.PREFIX) {
    return results
  } else {
    // This is for systems
    return results.filter(res => res.NodeType === 'Term')
  }
}
