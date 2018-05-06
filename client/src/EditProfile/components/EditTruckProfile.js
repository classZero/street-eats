import React, { Component } from 'react';
import {getProfile} from '../../truckprofile/actions/tProfileActions'
import { connect } from 'react-redux';
import {editTruckProfile} from '../actions/edittruckprofileaction'
import {Redirect, Link} from 'react-router-dom'
import MapViewInputs from '../../MapView/mapviewcomponents/MapViewInputs';
import './edittruckprofile.css'
import HomeHeader from '../../headers/HomeHeader'
import MenuBuilder from 'MenuBuilder/components/MenuBuilder'

class EditTruckProfile extends Component {
    state = {
        name: '',
        logo: '',
        aboutus: '',
        menuurl: ''
    }
    
    componentDidMount(){
        getProfile(this.props.username)       ///add username as argument
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
            <div>{this.props.isAuth ? 
                <div>
                  <HomeHeader />
                  <div className="edittruck-bigContainer">
                    <MapViewInputs />
                    <div className="edittruck-container">
                      <header>
                        <h1>Edit Profile</h1>
                      </header>
                        <form onSubmit={this.handleSubmit}>
                            <div>Edit Truck Name: <input onChange={this.handleChange} type='text' name='name' value={this.state.name} /> </div>
                            <div>Edit Truck logo: <input onChange={this.handleChange} type='text' name='logo' value={this.state.logo} /> </div>
                            <div><img  alt="logo" src={this.props.profile.logo} /></div>
                            <div>Edit About Us: <textarea onChange={this.handleChange} name='aboutus' value={this.state.aboutus} /></div>
                            <div>Edit Menu Url: <input onChange={this.handleChange} type='text' name='menuurl' value={this.state.menuurl} /> </div>
                            <div><img alt="menu" src={this.props.profile.menuurl} /></div>
                            <div><Link to={"/build/" + this.props.username}>Edit Menu Page</Link></div>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                  </div>
                </div> : <Redirect to='/' />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile : state.tProfileReducer.profile,
        isAuth: state.loginReducer.isAuthenticated
    }
}


export default connect(mapStateToProps)(EditTruckProfile)
