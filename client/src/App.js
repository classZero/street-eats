import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import store from './store.js'
import TProfileView from './truckprofile/components/tprofileview'
import URegistration from './UserRegistration/components/URegistration'
import Home from './home/Home'
import MapViewHome from './MapView/mapviewcomponents/MapsViewHome'
import MapViewInputs from './MapView/mapviewcomponents/MapViewInputs'

class App extends Component {
  render () {
    return (
        <Router>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/truckprofile" component={TProfileView} />
            <Route path="/URegistration" component={URegistration} />
            <Route path="/map" component={MapViewHome} />
            <Route path="/mapinputs" component={MapViewInputs} />
          </div>
        </Router>
    )
  }
}

export default App
