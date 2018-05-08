import React, { Component } from 'react'
import {connect} from 'react-redux'
import trucksvg from 'assets/images/truck.svg'
import {Link} from 'react-router-dom'

import './homeHeader.css'

export class RegistrationHeader extends Component {
  render() {
    return (
      <div className="home-header">
            
        <div className="logo-container"><Link to="/" style={{color: "inherit", cursor: "pointer"}}><h1 className="content-headers-title">Street Eats</h1></Link> <img className="logo-icon" src={trucksvg} alt="logo"/></div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    username: state.loginReducer.username,
    avatar: state.loginReducer.avatar
  }
}

export default connect(mapStateToProps)(RegistrationHeader)
