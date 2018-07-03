import React, { Component } from 'react';
import {getUserProfile} from '../../userprofile/actions/uProfileActions'
import { connect } from 'react-redux';
import '../../EditProfile/components/edituserprofile.css'
import HomeHeader from '../../headers/HomeHeader'


class EditUserProfile extends Component {
    
    componentDidMount() {
        getUserProfile(this.props.username)
    }

    render() {
        return (
          <div>
            <HomeHeader />
            <div className="edituser-container">
                <div className="edituser-username">Username: {this.props.profile.username}</div>
                <div className="edituser-email">Email: {this.props.profile.email}</div>
                <div className="edituser-img">Profile Image: <img  alt="profile" src={this.props.profile.avatar} /></div>
            </div>
          </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        profile : state.uProfileReducer.profile,
        username : state.loginReducer.username,
        email: state.uProfileReducer.email
    }
}

export default connect(mapStateToProps)(EditUserProfile)
