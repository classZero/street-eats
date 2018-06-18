import React, { Component } from 'react'
import {getProfile} from '../../truckprofile/actions/tProfileActions'
import { connect } from 'react-redux'
import {editTruckProfile} from '../actions/edittruckprofileaction'
import {Redirect} from 'react-router-dom'
import MapViewInputs from '../../MapView/mapviewcomponents/MapViewInputs'
import HomeHeader from '../../headers/HomeHeader'
import MenuBuilder from '../../MenuBuilder/components/MenuBuilder'
import './edittruckprofile.css'

class EditTruckProfile extends Component {
    state = {
        name: '',
        logo: '',
        aboutus: '',
        menuurl: '',
        toggleMenuEdit: 'profile'
    }
    
    componentDidMount(){
        getProfile(this.props.username)
    }

    handleChange = (e) =>{
        e.preventDefault()
            this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        editTruckProfile(this.state.name, this.state.logo, this.state.aboutus, this.state.menuurl, this.props.username)
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

    toggleProfileMenu = (e) => {
        e.preventDefault()
        if (this.state.toggleMenuEdit !== 'menu') {
            this.setState({
                toggleMenuEdit: 'menu'
            })
        } else {
            this.setState({
                toggleMenuEdit: 'profile'
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
                    { this.state.toggleMenuEdit === 'menu' ? <MenuBuilder toggle={this.toggleProfileMenu} username={this.props.username}/> :
                        <div className="edittruck-container">
                          <div className="edit-truck-header-wrapper">
                            <h1>Edit Profile</h1>
                            <button onClick={this.toggleProfileMenu} className="menubuilder-toggle">Edit Menu</button>
                          </div>
                          <div className="edit-truck-body-wrapper">
                            <form onSubmit={this.handleSubmit}>
                                <h4>Edit Truck Name:</h4>
                                <div> 
                                  <input onChange={this.handleChange} type='text' name='name' value={this.state.name} placeholder={this.props.profile.companyname}/> 
                                </div>
                                <h4>Edit Truck logo:</h4>
                                <div>
                                  <input onChange={this.handleChange} type='text' name='logo' value={this.state.logo} /> 
                                </div>
                                <div>
                                  <img  alt="logo" src={this.props.profile.logo} />
                                </div>
                                <h4>Edit About Us:</h4>
                                <div>
                                  <textarea onChange={this.handleChange} name='aboutus' value={this.state.aboutus} />
                                </div>
                                <h4>Edit Menu Url:</h4>
                                <div>
                                  <input onChange={this.handleChange} type='text' name='menuurl' value={this.state.menuurl} /> 
                                </div>
                                <div>
                                  <img alt="menu" src={this.props.profile.menuurl} />
                                </div>
                                <button id="edit-truck-submit-button" type='submit'>Submit</button>
                            </form>
                          </div>
                        </div>
                    }
                  </div>
                </div> : <Redirect to='/' />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile : state.tProfileReducer.profile,
        isAuth: state.loginReducer.isAuthenticated,
        username: state.loginReducer.username
    }
}


export default connect(mapStateToProps)(EditTruckProfile)
