import React, { Component } from 'react'
import {login} from './loginActions'
import FontAwesome from 'react-fontawesome'

import './login.css'

export class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  componentDidMount = (e) => {
    this.nameInput.focus()
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
        <form onSubmit={this.handleLoginSubmit} id="login-form">
          <input onChange={this.handleChange} 
                 autoComplete="off"
                 type="text" 
                 name="username" 
                 value={this.state.username}
                 className="login-input"
                 ref={(input) => { this.nameInput = input; }}/>
                 <span id="login-input-username-icon">{<i className="fas fa-user"></i>}</span>
          <input onChange={this.handleChange} 
                 autoComplete="off"
                 type="password" 
                 name="password" 
                 value={this.state.password}
                 className="login-input"
                 id="login-input-password"/>
                 <span id="login-input-password-icon">{<i className="fas fa-key"></i>}</span>
          <button type="submit" style={{display: 'none'}}>Hide submit button</button>
        </form>
      </div>
    )
  }
}

export default Login;
