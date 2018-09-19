import {Route, Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {Provider} from 'react-redux'

import ReactDOM from 'react-dom'
import React from 'react'

import NetworkView from './containers/NetworkView'
import FrontPage from './containers/FrontPage'

import configure from './store'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

// Start the application
ReactDOM.render(
  <Provider store={store}>

    <Router history={history}>
      <Route
        component={FrontPage}
        path="/"
      />
      <Route
        component={NetworkView}
        path="/:uuid"
      />
    </Router>
  </Provider>, document.getElementById('root'))
