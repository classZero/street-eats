import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store.js'
import TProfileView from './truckprofile/components/tprofileview'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={TProfileView} />
        </Router>
      </Provider>
    )
  }
}

export default App
