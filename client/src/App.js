import React, { Component } from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TProfileView from './truckprofile/components/tprofileview'
import Home from './home/Home'
import UProfileView from './userprofile/components/uprofileview'
import EditProfile from './EditProfile/components/EditProfile'
import registrationPage from './registrationPages/registrationPage'
import Stripe from './stripe/Stripe'
import Orders from './orders/Orders'

import './App.css'

class App extends Component {
  static defaultProps = {
    message: ''
  }
  render () {
    return (
      <div style={{position: 'relative'}}>
              {this.props.message === '' ? '' : <div className="popup-container"><h3 className="popup-message">{this.props.message}</h3></div>}
        <Router>
          <div className="route-wrapper" style={{position: 'relative'}}>
            <Route exact path="/" component={Home} />
            <Route path="/truckprofile/:username" component={TProfileView} />
            <Route path="/userprofile/:username" component={UProfileView} />
            <Route path="/editprofile" component={EditProfile} />
            <Route path="/registrationPage" component={registrationPage} />
            <Route path="/payments" component={Stripe} />
            <Route path="/orders" component={Orders} />
          </div>
        </Router>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    message: state.homeReducer.message.message
  }
}

export default connect(mapStateToProps)(App)

