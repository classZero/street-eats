import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateLocation, removeLocation} from '../../home/homeActions'
import Logout from '../../logout/Logout'
import './dropdown.css'
import loading from '../../assets/images/truck.gif'

class HomeDropdown extends Component {
  state = {
    showMenuHome: false,
    response: ''
  }
  // dropdown functions
  handleClickHome = (event) => {
    if (!this.state.showMenuHome) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClickHome, false)
    } else {
      //remove event handler and stay on page
      document.removeEventListener('click', this.handleOutsideClickHome, false)
    }
    this.setState(prevState => ({
      showMenuHome: !prevState.showMenuHome,
   }))
  }
  handleOutsideClickHome = (event) => {
    // ignore clicks on the component itself
    if (this.nodeH.contains(event.target)) {
      return
    }
    this.handleClickHome()
  }
  componentWillUnmount = () => {
    //remove event handler before navigating away
    document.removeEventListener('click', this.handleOutsideClickHome, false)
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
    const classesHome = this.state.showMenuHome ? 'menu' : 'menu hide'
    const btnColorHome = this.state.showMenuHome ? 'dropmenu-btn color' : 'dropmenu-btn noColor'
    return (
      <div className="dropdown-menu" ref={node => { this.nodeH = node }} >
        {window.localStorage.getItem('token') ?
        <div>
          <button onClick={this.handleClickHome} className={btnColorHome}>Menu &#9662;</button>
          {this.state.showMenuHome && (
          <div className={classesHome} >
            {this.props.source === 'user' ?
              <div className="profile-link-group">
                <Link to={'/userprofile/' + this.props.username}>View My Profile</Link>
                <Logout />
              </div> :
              <div className="profile-link-group">
                <Link to={'/truckprofile/' + this.props.username}>View My Profile</Link>
                <Link to="/editprofile">Edit Profile</Link>
                <button onClick={() => this.geoFindMe()}>Update my location</button>
                {this.state.response ? <img src={this.state.response} id="loading-gif" alt="loading..."/> : ''}
                <button onClick={this.handleRemoval}>Remove my truck</button>
                <Logout />
              </div>
            }
          </div>
          )}
        </div>
          : 
          <div>
            <button onClick={this.handleClickHome} className={btnColorHome}>Sign Up &#9662;</button>
            <div className={classesHome}>
              <Link to="/registrationPage">Register</Link>
            </div>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    source: state.loginReducer.source,
    username: state.loginReducer.username
  }
}

export default connect(mapStateToProps)(HomeDropdown)
