import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { logger } from '../middleware'
import rootReducer from '../reducers'
import goSaga from '../sagas/goSaga'

const sagaMiddleware = createSagaMiddleware()

export default function configure(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    thunk,
    logger
  )(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)
  sagaMiddleware.run(goSaga)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}
