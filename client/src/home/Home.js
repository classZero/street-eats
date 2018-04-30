import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Login from '../login/Login'
import MapViewHome from '../MapView/mapviewcomponents/MapsViewHome'
import HomeDropdown from '../dropdowns/homeDropdown/HomeDropdown'

// import URegistration from '../UserRegistration/components/URegistration'

import './home.css'

export class Home extends Component {
  static defaultProps = {
    username: ''
  }

  render() {
    return (
      <div className="home-container">
        <div className="home-header">
          <Login />
          <HomeDropdown />
          <h1>Food truck</h1>
          <Link to="/Uregistration">temp user reg page</Link>
          <Link to="/Tregistration">temp truck registration page</Link>
          <Link to="/userprofile">working user profile page</Link>
          <Link to="/truckprofile">working truck profile page</Link>
        </div>
        <div className="home-body-container">
          <MapViewHome />
          <div className="home-newsfeed">
            <h3>Coming Events</h3>
            <div>
              <p>message content</p>
            </div>
          </div>
          <p>Current Username {this.props.username}</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  console.log('isAuth? ' + state.loginReducer.isAuthenticated)
  console.log('CurrUser ' + state.loginReducer.username)
  return {
    isAuthenticated: state.loginReducer.isAuthenticated,
    username: state.loginReducer.username
  }
}

export default connect(mapStateToProps)(Home)
