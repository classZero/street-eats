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
                <div>Username: {this.props.profile.username}</div>
                <div>Email: {this.props.profile.email}</div>
                <div>Profile Image: <img src={this.props.profile.avatar} /></div>
            </div>
        );
    }
}


function mapStateToProps(state) {
  console.log('editUserProfile state', state)
    return {
        profile : state.uProfileReducer.profile,
        username : state.loginReducer.username,
        email: state.uProfileReducer.email
    }
}

export default connect(mapStateToProps)(EditUserProfile);
