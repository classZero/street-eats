import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Logout from '../../logout/Logout'
import './homeDropdown.css'

class HomeDropdown extends Component {
  
  showMenu = (event) => {
    event.preventDefault();
    this.setState({ showMenu: true })
  }
  
  hideMenu = (event) => {
    event.preventDefault();
    this.setState({ showMenu: false })
  }
  
  // closeMenu = () => {
  //   this.setState({ showMenu: false })
  // }
  
  state = {
    showMenu: false,
  }
  render() {
    const classes = this.state.showMenu ? 'menu' : 'menu hide'
    return (
      <div className="dropdown-menu">
        {window.localStorage.getItem('token') ?
        <div>
          <button onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu} className="dropmenu-btn">Dropdown menu &#9662;</button>
          <div className={classes} onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>
            <Link to="/Uregistration">user reg page</Link>
            <Link to="/Tregistration">truck reg page</Link>
            {this.props.source === 'user' ? <Link to="/editprofile">user profile</Link>
                                          : <Link to="/truckprofile">truck profile</Link>
            }
            <Link to="/mapinputs">inputs for trucks</Link>
            <Link to="map">links to map</Link>
            <Link to={'/editprofile'} >edit my profile</Link>
            <div><Logout /></div>
          </div>
        </div>
          : 
          <div>
            <button onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu} id="dropmenu-btn">Sign Up &#9662;</button>
            <div className={classes} onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>
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
