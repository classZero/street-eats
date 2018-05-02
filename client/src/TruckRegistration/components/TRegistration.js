import React, {Component} from 'react'
import {connect} from 'react-redux'
import {registerTruck, addImage} from '../actions/TRegistrationActions'
import Dropzone from 'react-dropzone'
import request from 'superagent'
// import axios from 'axios'



class TRegistration extends Component {
	state = {
		username: '',
		companyName: '',
		email: '',
		aboutus: '',
		password: '',
    confirmPassword: '',
    uploadCloudinaryLogoUrl: '',
    uploadedFile: ''
	}

	handleChange = (e) =>{
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) =>{
		e.preventDefault()

		const userRegExp = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/
		const passRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%_-]{2,}$/
		const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		
    	console.log(this.state.uploadCloudinaryLogoUrl)

		if(this.state.username && userRegExp.test(this.state.username)){
			if(this.state.email && emailRegExp.test(this.state.email)){
				if(this.state.password && passRegExp.test(this.state.password)){
					if(this.state.password !== '' && this.state.password === this.state.confirmPassword){

						registerTruck(
							this.state.username,
							this.state.password,
							this.state.email,
							this.state.companyName,
							this.state.uploadCloudinaryLogoUrl,
							// menu: this.state.uploadCloudinaryMenuUrl,
							this.state.aboutus
				    	)

				    // addImage(this.state.uploadCloudinaryUrl)

						this.setState({
							username: '',
							companyName: '',
							email: '',
							aboutus: '',
							password: '',
							confirmPassword: ''
						})
					} else {window.alert('Passwords must match')}
				} else {window.alert('Passwords must contain at least one letter and one number, and may also contain !,@,#,$,%,_,-')}
			} else {window.alert('Please enter a valid email')}
		} else {window.alert('Usernames can only include characters A-Z, 0-9, and may use _ and - as seperators')}
  }

  onImageDrop = (files) => {
    console.log('Treg files ' + files)
    this.setState({
      uploadedFile: files[0]
    })
    this.handleImageUpload(files[0])
  }
  
  handleImageUpload(file) {
    const CLOUDINARY_UPLOAD_PRESET = 'bvidje9n'//'your_upload_preset_id';
    const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/maglingkod/image/upload'                      
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        console.log('resp.body.secure_url ' + response.body.secure_url )
        this.setState({
          uploadCloudinaryLogoUrl: response.body.secure_url
        })
      }
    })
  }
  

	render(){
		return(
			<div>
				<fieldset>
					<legend>Food Truck Registration</legend>
					<form onSubmit={this.handleSubmit} encType="multipart/form-data">
						<input onChange={this.handleChange} type="text" name="username" value={this.state.username}  placeholder="username"/>
						<input onChange={this.handleChange} type="text" name="companyName" value={this.state.companyname} placeholder="company name" />
						<input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="email"/>
						{/* <label>Logo<input type="file" name="companyLogo" /></label>  */}
						{/* <label>Menu<input type="file" name="menu" /></label> */}
						<textarea onChange={this.handleChange} name="aboutus" value={this.state.aboutus} placeholder="about us" ></textarea>
						<input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="password"/>
						<input onChange={this.handleChange} type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="confirm password"/>
			            <div className="add-image-container">
			              <Dropzone
			                multiple={false}
			                accept="image/*"
			                onDrop={this.onImageDrop}>
			                <p>Drop your logo image or click to select a file to upload.</p>
			              </Dropzone>
			              <div>
			                {this.state.uploadCloudinaryLogoUrl === '' ? null :
			                <div>
			                  <img id="upload-img" src={this.state.uploadCloudinaryLogoUrl} alt="upload"/>
			                </div>}
			              </div>
			              
			            </div>
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
