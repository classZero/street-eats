import React, { Component } from 'react'
import {login} from './loginActions'

import './login.css'

export class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleLoginSubmit = (e) => {
    e.preventDefault()
    login(this.state.username, this.state.password)
    this.setState({
      username: '',
      password: ''
    })
  }
  render() {
    return (
      <div className="home-login-container">
        <form onSubmit={this.handleLoginSubmit} >
          <input onChange={this.handleChange} 
                 autoComplete="off"
                 type="text" 
                 name="username" 
                 value={this.state.username}
                 placeholder="username"
                 className="login-input"/>
          <input onChange={this.handleChange} 
                 autoComplete="off"
                 type="password" 
                 name="password" 
                 value={this.state.password}
                 placeholder="password"
                 className="login-input"/>
          <button type="submit" style={{display: 'none'}}>Hide submit button</button>
        </form>
      </div>
    )
  }
}

export default Login;
