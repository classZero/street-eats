import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Login from './Login'
import URegistration from '../UserRegistration/components/URegistration'

import './home.css'

export class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-header">
          <Login />
          <h1>Food truck</h1>
          <Link to="/Uregistration">temp user reg page</Link>
          <Link to="/Tregistration">set link here for truck registration page</Link>
        </div>
        <div className="home-body-container">
          something here
          <div className="home-newsfeed">
            <h3>Coming Events</h3>
            <div>
              <p>message content</p>
            </div>
          </div>
          something here
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('isAuth? ' + state.loginReducer.isAuthenticated)
  return {
    isAuthenticated: state.loginReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(Home)
