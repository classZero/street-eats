import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import TRegistration from '../TruckRegistration/components/TRegistration'
// import glamorous from 'glamorous'
// import Login from '../login/Login'
// import {getTruckData} from './homeActions'
// import MapViewHome from '../MapView/mapviewcomponents/MapsViewHome'
// import HomeDropdown from '../dropdowns/homeDropdown/HomeDropdown'
// import trucksvg from 'assets/images/truck.svg'
import './registrationPage.css'
import URegistration from '../UserRegistration/components/URegistration'

class registrationPage extends Component {
  render() {
    return (
      <div>
        <div className="registrationHeader">
          <Link to="/">Back</Link>
          <h1>Are You A ...</h1>

        </div>

      <div className="twoRegContainer">
        <TRegistration />
        <URegistration />
      </div>

      </div>
    )
  }
}

export default registrationPage
