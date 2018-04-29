import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
// import MapViewHome from '../.././MapView/mapviewcomponents/MapViewHome'
import MapViewHome from '../../MapView/mapviewcomponents/MapsViewHome'

class App extends Component {
  render () {
    return (
      <Router>

      <Route exact path="/map" component={MapViewHome} />

      </Router>
    )
  }
}

export default App
