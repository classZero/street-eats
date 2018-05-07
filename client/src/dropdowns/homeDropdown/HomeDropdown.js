import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Logout from '../../logout/Logout'
import './dropdown.css'

class HomeDropdown extends Component {
  state = {
    showMenuHome: false
  }

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
            <Link to="/Uregistration">user reg page</Link>
            <Link to="/Tregistration">truck reg page</Link>
            <Link to="/mapinputs">inputs for trucks</Link>
            <Link to="map">links to map</Link>
            {this.props.source === 'user' ?
              <Link to={'/userprofile/' + this.props.username}>View My Profile</Link> :
              <Link to={'/truckprofile/' + this.props.username}>View My Profile</Link>
            }
            <div><Logout /></div>
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
