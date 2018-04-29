import React, {Component} from 'react'
import {connect} from 'react-redux'

class URegistration extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	}

	handleChange = (e) =>{
		this.setState({
			[e.target.name]: e.target.value
		})
	}


	render(){
		return(
			<div>
				<fieldset>
					<legend>User Registration</legend>
					<form>
						<input onChange={this.handleChange} type="text" name="username" value={this.state.username}  placeholder="username"/>
						<input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="email"/>
						<input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="password"/>
						<input onChange={this.handleChange} type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="confirm password"/>
						<button type="submit">Register User</button>
					</form>
				</fieldset>
			</div>
	)}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(URegistration)