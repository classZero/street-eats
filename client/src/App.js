import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TProfileView from './truckprofile/components/tprofileview'
import Home from './home/Home'
import UProfileView from './userprofile/components/uprofileview'
import EditProfile from './EditProfile/components/EditProfile'
import registrationPage from './registrationPages/registrationPage'
import Stripe from './stripe/Stripe'

class App extends Component {
  render () {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/truckprofile/:username" component={TProfileView} />
            <Route path="/userprofile/:username" component={UProfileView} />
            <Route path="/editprofile" component={EditProfile} />
            <Route path="/registrationPage" component={registrationPage} />
            <Route path="/payments" component={Stripe} />
          </div>
        </Router>
    )
  }
}

export default App

