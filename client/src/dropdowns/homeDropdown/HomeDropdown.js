import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Logout from '../../logout/Logout'
import './homeDropdown.css'

class HomeDropdown extends Component {
  state = {
    showMenu: false,
  }

  toggleMenu = (event) => {
    event.preventDefault()
    this.setState({ showMenu: !this.state.showMenu })
  }
  
  render() {
    const classes = this.state.showMenu ? 'menu' : 'menu hide'
    return (
      <div className="dropdown-menu" >
        {window.localStorage.getItem('token') ?
        <div>
          <button onClick={this.toggleMenu} className="dropmenu-btn">Menu &#9662;</button>
          <div className={classes} >
            <Link to="/Uregistration">user reg page</Link>
            <Link to="/Tregistration">truck reg page</Link>
            {this.props.source === 'user' ? <Link to="/editprofile">user profile</Link>
                                          : <Link to="/truckprofile">truck profile</Link>
            }
            <Link to="/mapinputs">inputs for trucks</Link>
            <Link to="map">links to map</Link>
            {this.viewProfile(this.props.source, this.props.username)}
            <div><Logout /></div>
          </div>
        </div>
          : 
          <div>
            <button onClick={this.toggleMenu} id="dropmenu-btn">Sign Up &#9662;</button>
            <div className={classes}>
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
