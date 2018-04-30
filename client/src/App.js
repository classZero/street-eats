import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import store from './store.js'
import TProfileView from './truckprofile/components/tprofileview'
import URegistration from './UserRegistration/components/URegistration'
import Home from './home/Home'
<<<<<<< HEAD
import UProfileView from './userprofile/components/uprofileview'
=======
import MapViewHome from './MapView/mapviewcomponents/MapsViewHome'
>>>>>>> master

class App extends Component {
  render () {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/truckprofile" component={TProfileView} />
            <Route path="/URegistration" component={URegistration} />
<<<<<<< HEAD
            <Route path="/userprofile" component={UProfileView} />
=======
            <Route path="/map" component={MapViewHome} />
>>>>>>> master
          </div>
        </Router>
    )
  }
}

export default App
