import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Logout from '../../logout/Logout'
import './homeDropdown.css'

class HomeDropdown extends Component {
  state = {
    showMenu: false,
  }
  
  showMenu = (event) => {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    })
  }
  hideMenu = (event) => {
    event.preventDefault();
    
    this.setState({ showMenu: false }, () => {
      document.addEventListener('click', this.closeMenu);
    })
  }
  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    })
  }

  render() {
    const classes = this.state.showMenu ? 'menu' : 'menu hide'
    return (
      <div className="dropdown-menu">
        {window.localStorage.getItem('token') ?
        <div>
          <button onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu} id="dropmenu-btn">Dropdown menu &#9662;</button>
          <div className={classes} onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>
            <Link to="/Uregistration">user reg page</Link>
            <Link to="/Tregistration">truck reg page</Link>
            {this.props.source === 'user' ? <Link to="/userprofile">user profile</Link>
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
              <Link to="/Uregistration">Register as a user</Link>
              <Link to="/Tregistration">Register as a truck</Link>
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
