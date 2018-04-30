import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store.js'
import TProfileView from './truckprofile/components/tprofileview'
import URegistration from 'UserRegistration/components/URegistration'
import TRegistration from 'TruckRegistration/components/TRegistration'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
	        <div>
	        	<Route path="/registration" component={URegistration} />
            <Route path="/truck" component={TRegistration} />
	        	<Route exact path="/" component={TProfileView} />
	        </div>
        </Router>
      </Provider>
    )
  }
}

export default App
