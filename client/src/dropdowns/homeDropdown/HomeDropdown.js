import React, { Component } from 'react'
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
  
  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    })
  }

  render() {
    return (
      <div className="dropdown-menu">
        <button onClick={this.showMenu}>Dropdown menu</button>
        
        {this.state.showMenu ? 
          (<div className="menu">
              <Logout />
              <Link to=""> Menu item 2 </Link>
              <Link to=""> Menu item 3 </Link>
              <Link to="/Uregistration">temp user reg page</Link>
              <Link to="/Tregistration">temp truck registration page</Link>
              <Link to="/userprofile">working user profile page</Link>
              <Link to="/truckprofile">working truck profile page</Link>
              <Link to="/mapinputs">inputs for trucks</Link>
              <Link to="map">links to map</Link>
           </div>)
            : (null)}
      </div>
    )
  }
}

export default HomeDropdown
