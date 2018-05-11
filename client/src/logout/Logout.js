import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
// import {logoutUser} from './logoutActions'
import api from '../lib/api'

export class Logout extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    api.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <Link to="/" onClick={this.handleLogout}>Logout</Link>
      </div>
    )
  }
}

export default withRouter(Logout)
