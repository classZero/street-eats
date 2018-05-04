import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Logout from '../../logout/Logout'
import './homeDropdown.css'

class TruckListDropdown extends Component {
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
        <div>
          <button onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu} id="dropmenu-btn">Dropdown menu &#9662;</button>
          <div className={classes} onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>
            <Link to={`/truckdata/${this.props.sortType}`}><button onClick={this.props.setSortType} value="all">Show All</button></Link>
            <Link to={`/truckdata/${this.props.sortType}`}><button onClick={this.props.setSortType} value="new">Show Newest</button></Link>
            <Link to={`/truckdata/${this.props.sortType}`}><button onClick={this.props.setSortType} value="alpha">Show By Company Name</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    source: state.loginReducer.source
  }
}

export default connect(mapStateToProps)(TruckListDropdown)
