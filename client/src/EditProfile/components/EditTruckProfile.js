import React, { Component } from 'react';
import {getProfile} from '../../truckprofile/actions/tProfileActions'
import { connect } from 'react-redux';
import {editTruckProfile} from '../actions/edittruckprofileaction'







class EditTruckProfile extends Component {

state = {
    name: '',
    logo: '',
    aboutus: '',
    menuurl: ''
}
    
    componentDidMount(){
        getProfile()       ///add username as argument
    }

    handleChange = (e) =>{
        e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}

    handleSubmit = (e) => {
        e.preventDefault()
        editTruckProfile(this.state.name, this.state.logo, this.state.aboutus, this.state.menuurl)
    }

    componentDidUpdate(prevprops, prevstate){
        if(prevstate.name === '') {
            this.setState({
                name : this.props.profile.companyname,
                logo: this.props.profile.logo,
                aboutus: this.props.profile.aboutus,
                menuurl: this.props.profile.menuurl
            })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>Company Name: <input onChange={this.handleChange} type='text' name='name' value={this.state.name} /> </div>
                    <div>Company logo: <input onChange={this.handleChange} type='text' name='logo' value={this.state.logo} /> </div>
                    <div><img src={this.props.profile.logo} /></div>
                    <div>About us: <textarea onChange={this.handleChange} name='aboutus' value={this.state.aboutus} /></div>
                    <div> Menu Url: <input onChange={this.handleChange} type='text' name='menuurl' value={this.state.menuurl} /> </div>
                    <div><img src={this.props.profile.menuurl} /></div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile : state.tProfileReducer.profile,
        username : state.loginReducer.username
    }
}


export default connect(mapStateToProps)(EditTruckProfile)