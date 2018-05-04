import React, { Component } from 'react'
import Login from '../login/Login'
import HomeDropdown from '../dropdowns/homeDropdown/HomeDropdown'
import trucksvg from 'assets/images/truck.svg'

export class HomeHeader extends Component {
  render() {
    return (
      <div className="home-header">
            
        <div className="home-header-login">
          <p>Login:</p>
          <Login />
        </div>

        <div className="logo-container"><h1 className="content-headers-title">Street Eats</h1> <img className="logo-icon" src={trucksvg}/></div>

        <div className="home-header-dropdown">
          {this.props.username ? <p>Username : {this.props.username}</p> : ''}
          <HomeDropdown />
        </div>

      </div>
    )
  }
}

export default HomeHeader
