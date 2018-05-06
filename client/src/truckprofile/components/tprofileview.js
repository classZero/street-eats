import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProfile } from '../actions/tProfileActions'
import { Link } from 'react-router-dom'
import './tprofile.css'
import HomeHeader from '../../headers/HomeHeader'

class TProfileView extends Component {

    componentDidMount(){
        getProfile(this.props.match.params.username)
    }

    editTruckProfile(username) {
        if(username === this.props.match.params.username) {
            return <Link to="/editprofile">Edit Profile</Link>
        }
    }

    render() {
        return (
            <div>
              
              <HomeHeader />

                <div className="tprofile-container">
                    <div className="tprofile-header">
                    <Link to="/" className="tprofile-back">Back</Link>
                    <p>{this.props.profile.companyname}</p>
                    </div>
                    <div className="tprofile-img-container"><img alt="logo" src={this.props.profile.logo} /></div>
                    <div className="tprofile-about-header">ABOUT US</div>
                    <div className="tprofile-about">{this.props.profile.aboutus}</div>
                    <div className="tprofile-menu"><img alt="menu" src={this.props.profile.menuurl} /></div>
                    <p className="tprofile-edit">{this.editTruckProfile(this.props.username)}</p>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile : state.tProfileReducer.profile,
        username: state.loginReducer.username,
        isAuth: state.loginReducer.isAuthenticated
    }
}


export default connect(mapStateToProps)(TProfileView)
