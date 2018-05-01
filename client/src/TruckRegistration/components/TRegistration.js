import React, {Component} from 'react'
import {connect} from 'react-redux'
import {registerTruck} from '../actions/TRegistrationActions'
import Dropzone from 'react-dropzone'


class TRegistration extends Component {
	state = {
		username: '',
		companyName: '',
		email: '',
		aboutus: '',
		password: '',
    confirmPassword: '',
    uploadCloudinaryUrl: '',
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

  onImageDrop = (files) => {
    this.setState({
      uploadedFile: files[0]
    })
    this.handleImageUpload(files[0])
  }
  
  handleImageUpload(file) {
    const CLOUDINARY_UPLOAD_PRESET = 'bvidje9n'//'your_upload_preset_id';
    const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/maglingkod/image/upload'                      //'https://api.cloudinary.com/v1_1/your_cloudinary_app_name/upload';
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
          uploadCloudinaryUrl: response.body.secure_url
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
                <p>Drop an image or click to select a file to upload.</p>
              </Dropzone>
              <div>
                {this.state.uploadCloudinaryUrl === '' ? null :
                <div>
                  {/* <p>{this.state.uploadedFile.name}</p> */}
                  <img id="upload-img" src={this.state.uploadCloudinaryUrl} alt="upload"/>
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
