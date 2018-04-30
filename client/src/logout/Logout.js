import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {logoutUser} from './logoutActions'

export class Logout extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    logoutUser()
  }
  render() {
    return (
      <div>
        <Link to="/" onClick={this.handleLogout}>Logout</Link>
      </div>
    )
  }
};

export default Logout;
