import React, {Component} from 'react'
import {connect} from 'react-redux'
import {registerUser} from '../actions/URegistrationActions'
// import RegistrationHeader from '../../headers/registrationHeader'
import './URegistration.css'
import {withRouter} from 'react-router'

class URegistration extends Component {
	state = {
		username: '',
		email: '',
		password: '',
    confirmPassword: '',
    uploadCloudinaryAvatarUrl: ''
	}

	handleChange = (e) =>{
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) =>{
		e.preventDefault()

		//usernames may only contain alphanumeric characters, and may use the seperators '_' and '-'
		const userRegExp = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/
		//passwords must contain at least 1 letter and 1 number, and may use characters A-Z, 0-9, as well as the special characters !,@,#,$,%,_,-
		//lengthen password requirements for production
		const passRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%_-]{2,}$/
		// eslint-disable-next-line
		const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		if(this.state.username && userRegExp.test(this.state.username)){
			if(this.state.email && emailRegExp.test(this.state.email)){
				if(this.state.password && passRegExp.test(this.state.password)){
					if(this.state.password !== '' && this.state.password === this.state.confirmPassword){

						registerUser(
							this.state.username,
							this.state.password,
              this.state.email,
              this.state.uploadCloudinaryAvatarUrl
						)

						this.setState({
							username: '',
							email: '',
							password: '',
              confirmPassword: '',
              uploadCloudinaryAvatarUrl: ''
            })
            this.props.history.push('/')
					} else {window.alert('Passwords must match')}
				} else {window.alert('Passwords must contain at least one letter and one number, and may also contain !,@,#,$,%,_,-')}
			} else {window.alert('Please enter a valid email')}
    } else {window.alert('Usernames can only include characters A-Z, 0-9, and may use _ and - as seperators')}
	}

  uploadWidget = (e) => {
    e.preventDefault()
    let type = e.target.value
    let data = {result: [{}]}
    window.cloudinary.openUploadWidget({ cloud_name: 'maglingkod', upload_preset: 'avwvdugz', tags:['foodtruck']},
      (error, result) => {
        data = {result, type}
        console.log('result:', result)
        console.log('error:', result)
        if (result && result[0].secure_url !== '') {
          console.log('setting state')
          this.setState({
            uploadCloudinaryAvatarUrl: data.result[0].secure_url
          })
        }
      }
    )
  }  

	render(){
		return(
			<div>
        {/* <RegistrationHeader /> */}
        <div className="userRegContainer">

         <div className="userRegHeader">
            <h1>Foodie</h1>
          </div>

        <div className="userRegForm">
					<form onSubmit={this.handleSubmit}>
						<input onChange={this.handleChange} type="text" name="username" value={this.state.username}  placeholder="USERNAME" required/>
						<input onChange={this.handleChange} type="email" name="email" value={this.state.email} placeholder="John@example.com" required/>
						<input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="PASSWORD" required/>
						<input onChange={this.handleChange} type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="CONFIRM PASSWORD" required/>
						<button id="styleMeToo" onClick={this.uploadWidget} value="avatar" name="avatar" className="upload-button">Upload Image</button>
            <button type="submit">REGISTER</button>
					</form>
        </div>

        </div>
			</div>
	)}
}

function mapStateToProps(state) {
	return {}
}

export default withRouter(connect(mapStateToProps)(URegistration))
