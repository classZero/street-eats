import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {logoutUser} from './logoutActions'
import api from '../lib/api'

export class Logout extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    api.logout()
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
