import React, {Component} from 'react'
import {connect} from 'react-redux'
import {registerTruck, addImage} from '../actions/TRegistrationActions'
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react'

let images = []


class TRegistration extends Component {
	state = {
		username: '',
		companyName: '',
		email: '',
		aboutus: '',
		password: '',
    confirmPassword: '',
    uploadCloudinaryLogoUrl: '',
    uploadCloudinaryMenuUrl: '',
    uploadedFiles: []
	}

	handleChange = (e) =>{
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) =>{
		e.preventDefault()
		registerTruck(
			this.state.username,
			this.state.password,
			this.state.email,
			this.state.companyName,
			this.state.uploadCloudinaryLogoUrl,
			this.state.uploadCloudinaryMenuUrl,
			this.state.aboutus
    )

		this.setState({
			username: '',
			companyName: '',
			email: '',
			aboutus: '',
			password: '',
			confirmPassword: ''
		})
  }

  uploadWidget = (e) => {
    let type = e.target.value
    let data = {result: [{}]}
    window.cloudinary.openUploadWidget({ cloud_name: 'maglingkod', upload_preset: 'avwvdugz', tags:['foodtruck']},
      (error, result) => {
        data = {result, type}
        images.push(data)    //not currently using images array
        if (result[0].secure_url !== '') {
          if (type === 'logo') {
            this.setState({
              uploadCloudinaryLogoUrl: data.result[0].secure_url
            })
          }
          if (type === 'menu') {
            this.setState({
              uploadCloudinaryMenuUrl: data.result[0].secure_url
            })
          }
        }
      }
    )
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
						<textarea onChange={this.handleChange} name="aboutus" value={this.state.aboutus} placeholder="about us" ></textarea>
						<input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="password"/>
						<input onChange={this.handleChange} type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="confirm password"/>
            <div className="add-image-container">
            </div>
						<button type="submit">Register</button>
					</form>
				</fieldset>
        <button onClick={this.uploadWidget} value="logo" name="logo" className="upload-button">Upload Logo</button>
        <button onClick={this.uploadWidget} value="menu" name="menu" className="upload-button">Upload Menu</button>
        {/* <CloudinaryContext cloudName="maglingkod">
        {this.state.uploadedFiles.map(imageArray => imageArray.map((image, i) => {
                 return <div key={'key' + i}>
                        <a target="_blank" href={`https://res.cloudinary.com/maglingkod/image/upload/${image.public_id}.jpg`}>
                        <Image publicId={image.public_id}>
                          
                        </Image>
                        </a>
                        </div>
          })
        )}
        </CloudinaryContext> */}
			</div>
	)}
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps)(TRegistration)
