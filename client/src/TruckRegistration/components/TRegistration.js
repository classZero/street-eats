import React, {Component} from 'react'
import {connect} from 'react-redux'
import {registerTruck} from '../actions/TRegistrationActions'
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react'
import './TRegistration.css'

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


		const userRegExp = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/
		const passRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%_-]{2,}$/
		// eslint-disable-next-line
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
					} else {window.alert('Passwords must match')}
				} else {window.alert('Passwords must contain at least one letter and one number, and may also contain !,@,#,$,%,_,-')}
			} else {window.alert('Please enter a valid email')}
		} else {window.alert('Usernames can only include characters A-Z, 0-9, and may use _ and - as seperators')}
	}

  uploadWidget = (e) => {
    let type = e.target.value
    let data = {result: [{}]}
    window.cloudinary.openUploadWidget({ cloud_name: 'maglingkod', upload_preset: 'avwvdugz', tags:['foodtruck']},
      (error, result) => {
        data = {result, type}
        console.log('result:', result)
        console.log('error:', result)
        images.push(data)    //not currently using images array
        if (result && result[0].secure_url !== '') {
          if (type === 'logo') {
            this.setState({
              uploadCloudinaryLogoUrl: data.result[0].secure_url
            })
          }
          if (type && type === 'menu') {
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
        <div className="truckRegContainer">
          
          <div className="truckRegHeader">
            <h1>Truck</h1>
          </div>

          <div className="truckRegForm">
					<form onSubmit={this.handleSubmit} encType="multipart/form-data">
						<input onChange={this.handleChange} type="text" name="username" value={this.state.username}  placeholder="USERNAME"/>
						<input onChange={this.handleChange} type="text" name="companyName" value={this.state.companyName} placeholder="TRUCK NAME" />
						<input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="EMAIL"/>
						<textarea onChange={this.handleChange} name="aboutus" value={this.state.aboutus} placeholder="ABOUT YOUR TRUCK" ></textarea>
						<input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="PASSWORD"/>
						<input onChange={this.handleChange} type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="CONFIRM PASSWORD"/>
			            <div className="add-image-container">
			            </div>
				<div className="submitButtons">	
        <button onClick={this.uploadWidget} value="logo" name="logo" className="upload-button">Upload Logo</button>
        <button onClick={this.uploadWidget} value="menu" name="menu" className="upload-button">Upload Menu</button>
        <button className="submitBold" type="submit">REGISTER</button>
        </div>
        </form>
        </div>
        
        </div>
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
