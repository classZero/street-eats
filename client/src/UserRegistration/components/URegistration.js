import React, {Component} from 'react'
import {connect} from 'react-redux'
import {registerUser, testCall} from '../actions/URegistrationActions'

class URegistration extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	}

	handleChange = (e) =>{
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) =>{
		e.preventDefault()

		registerUser({
			username: this.state.username,
			email: this.state.email,
			password: this.state.password
		})

		this.setState({
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		})
	}

	handleTest = (e) =>{
		e.preventDefault()
		testCall()
	}

	render(){
		return(
			<div>
				<fieldset>
					<legend>User Registration</legend>
					<form onSubmit={this.handleSubmit}>
						<input onChange={this.handleChange} type="text" name="username" value={this.state.username}  placeholder="username"/>
						<input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="email"/>
						<input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="password"/>
						<input onChange={this.handleChange} type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="confirm password"/>
						<button type="submit">Register User</button>
					</form>
				</fieldset>
				<button onClick={this.handleTest}>Test SQL</button>
			</div>
	)}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(URegistration)