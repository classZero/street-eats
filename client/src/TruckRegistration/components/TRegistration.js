import React, {Component} from 'react'
import {connect} from 'react-redux'
import {registerTruck} from '../actions/TRegistrationActions'

class TRegistration extends Component {
	state = {
		username: '',
		companyName: '',
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
		registerTruck({
			username: this.state.username,
			password: this.state.password,
			email: this.state.email
		})
		this.setState({
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		})
	}

	render(){
		return(
			<div>
				<fieldset>
					<legend>Food Truck Registration</legend>
					<form onSubmit={this.handleSubmit}>
						<input onChange={this.handleChange} type="text" name="username" value={this.state.username}  placeholder="username"/>
						<input onChange={this.handleChange} type="text" name="companyName" value={this.state.companyname} placeholder="company name" />
						<input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="email"/>
						<input type="file" name="companyLogo" />
						<input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="password"/>
						<input onChange={this.handleChange} type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="confirm password"/>
						<button type="submit">Register</button>
					</form>
				</fieldset>
			</div>
	)}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(TRegistration)