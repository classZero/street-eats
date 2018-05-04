import React, { Component } from 'react';
import {getUserProfile} from '../../userprofile/actions/uProfileActions'
import { connect } from 'react-redux';





class EditUserProfile extends Component {
    
    componentDidMount() {
        getUserProfile(this.props.match.params.username)
    }

    render() {
        return (
            <div>
                <div>Username: {this.props.profile.username}</div>
                <div>Email: {this.props.profile.email}</div>
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