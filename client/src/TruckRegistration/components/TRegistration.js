import React, {Component} from 'react'
import {connect} from 'react-redux'
import {registerTruck} from '../actions/TRegistrationActions'

class TRegistration extends Component {
	state = {
		username: '',
		companyName: '',
		email: '',
		aboutus: '',
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
			email: this.state.email,
			companyInfo : {
				companyName: this.state.companyName,
				companyLogo: 'http://placehold.it/200/200',
				menu: 'http://placehold.it/400/400',
				aboutus: this.state.aboutus
			}

		})
		this.setState({
			username: '',
			companyName: '',
			email: '',
			aboutus: '',
			password: '',
			confirmPassword: ''
		})
	}

	render(){
		return(
			<div>
				<fieldset>
					<legend>Food Truck Registration</legend>
					<form onSubmit={this.handleSubmit} enctype="multipart/form-data">
						<input onChange={this.handleChange} type="text" name="username" value={this.state.username}  placeholder="username"/>
						<input onChange={this.handleChange} type="text" name="companyName" value={this.state.companyname} placeholder="company name" />
						<input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="email"/>
						<label>Logo<input type="file" name="companyLogo" /></label>
						<label>Menu<input type="file" name="menu" /></label>
						<textarea onChange={this.handleChange} name="aboutus" value={this.state.aboutus} placeholder="about us" ></textarea>
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