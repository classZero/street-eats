import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { slide as Menu } from 'react-burger-menu'
import Logout from '../../logout/Logout'
import {updateLocation, removeLocation} from '../../home/homeActions'
import loading from '../../assets/images/truck.gif'

import './burger.css'


export class HomeBurger extends Component {
  state = {
    showMenu: false,
    response: ''
  }

  showMenu = (e) => {
    e.preventDefault()
    this.setState({
      showMenu: false
    })
  }

  //location update functions
  geoFindMe = () => {
    if (!navigator.geolocation){
      alert('Geolocation is not supported by your browser')
      return
    }
    this.setState({
      response: loading
    })
    navigator.geolocation.getCurrentPosition(this.success, this.error)
  }
  success = (position) => {
    var latitude  = position.coords.latitude
    var longitude = position.coords.longitude
    this.setState({
      response: ''
    })
    updateLocation(latitude, longitude, this.props.username)
  }
  error = () => {
    this.setState({
      response: "Unable to retrieve your location"
    })
  }

  //remove truck from map and close hours
  handleRemoval = () => {
    removeLocation(this.props.username)
  }

  render() {
    return (
      <div>
      {/* <Menu> */}
      {window.localStorage.getItem('token') ?
        this.props.source === 'user' ?
          <Menu right noOverlay width={270} isOpen={ this.state.showMenu }>
            <p className="logTitle">Logged in as:</p>
            <p className="uName">{this.props.username}</p>
            <div><i className="far fa-user"></i><Link id="uProf" to={'/userprofile/' + this.props.username}>View My Profile</Link></div>
            <div><div id="uLog"><Logout /></div></div>
          </Menu> :
          <Menu right noOverlay width={270} isOpen={ this.state.showMenu }>
            <p className="logTitle">Logged in as:</p>
            <p className="uName">{this.props.username}</p>
            <div><i className="far fa-user"></i><Link id="tProf" to={'/truckprofile/' + this.props.username}>View My Profile</Link></div>
            <div><i className="fas fa-edit"></i><Link id="eProf" to='/editprofile'>Edit Profile</Link></div>
            <div><i className="far fa-list-alt"></i><Link id="order" to='/orders'>View orders</Link></div>
            <div><div className="update-loc-group"><i class="fas fa-map-marker"></i><button onClick={() => this.geoFindMe()}>Update my location</button>
            {this.state.response ? <img src={this.state.response} id="loading-gif" alt="loading..."/> : ''}</div></div>
            <div><i className="far fa-minus-square"></i><button id="remBtn" onClick={this.handleRemoval}>Remove my truck</button></div>
            <div><div id="tLog"><Logout /></div></div>
          </Menu>
         : 
          <Menu right noOverlay width={250} isOpen={ this.state.showMenu }>
            <Link id="regPage" to="/registrationPage">Register</Link>
          </Menu>}
        {/* <a onClick={ this.showMenu } className="menu-item--small" href="">Menu</a> */}
      {/* </Menu> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    source: state.loginReducer.source,
    username: state.loginReducer.username
  }
}

export default connect(mapStateToProps)(HomeBurger)
