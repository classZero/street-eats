import React, { Component } from 'react'
import {login} from './loginActions'

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
  }
  render() {
    return (
      <div className="home-login-container">
        <form onSubmit={this.handleLoginSubmit} >
          <input onChange={this.handleChange} 
                 type="text" 
                 name="username" 
                 value={this.state.username}
                 placeholder="username"/>
          <input onChange={this.handleChange} 
                 type="text" 
                 name="password" 
                 value={this.state.password}
                 placeholder="password"/>
          <button type="submit">Hide submit button</button>
        </form>
      </div>
    )
  }
}

export default Login;
