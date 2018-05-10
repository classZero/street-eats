import React, { Component } from 'react'
import Login from '../login/Login'
import {connect} from 'react-redux'
// import HomeDropdown from '../dropdowns/homeDropdown/HomeDropdown'
import HomeBurger from '../dropdowns/homeDropdown/testBurger'
import trucksvg from 'assets/images/truck.svg'
import {Link} from 'react-router-dom'

import './homeHeader.css'

export class HomeHeader extends Component {
  render() {
    return (
      <div className="home-header">
            
        {this.props.username ? '' : <div className="home-header-login">
                                  {/* <p>Login:</p> */}
                                  <Login />
                                </div>}

        <div className="logo-container"><Link to="/" style={{color: "inherit", cursor: "pointer"}}><h1 className="content-headers-title">Street Eats</h1></Link> <img className="logo-icon" src={trucksvg} alt="logo"/></div>

        <div className="home-header-dropdown">
          {this.props.username ? <div className="header-user-info">
                                  <span>{this.props.username}</span>
                                  {this.props.source === 'user' ? <img src={this.props.avatar} alt="avatar"/> :
                                                                  <img src={this.props.companyLogo} alt=""/>}
                                </div> : ' '}
          {/* <div className="dropdown-menu"> */}
              {/* <HomeDropdown /> */}
              <HomeBurger />
          {/* </div> */}
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    username: state.loginReducer.username,
    avatar: state.loginReducer.avatar,
    source: state.loginReducer.source,
    companyLogo: state.loginReducer.logo
  }
}

export default connect(mapStateToProps)(HomeHeader)
