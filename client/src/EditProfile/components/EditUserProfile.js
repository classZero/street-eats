import React, { Component } from 'react';
import {getUserProfile} from '../../userprofile/actions/uProfileActions'
import { connect } from 'react-redux';





class EditUserProfile extends Component {
    
    componentDidMount() {
        getUserProfile(this.props.username)
    }

    render() {
        return (
            <div>
                <div>
                    <div>Username: {this.props.profile.username}</div>
                    <div>Email: {this.props.profile.email}</div>
                    <div>Profile Image: <img alt='Profile' src="http://placehold.it/400/400" /></div>
                </div>
                <div>
                    {/* image change goes here */}
                    Change Profile Image
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        profile : state.uProfileReducer.profile,
        username : state.loginReducer.username,
        email: state.uProfileReducer.email
    }
}

export default connect(mapStateToProps)(EditUserProfile);