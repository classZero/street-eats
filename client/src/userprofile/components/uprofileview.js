import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUserProfile} from '../actions/uProfileActions'



class UProfileView extends Component {

    componentDidMount(){
        getUserProfile(this.props.username)
    }

    render() {
        return (
            <div>
              <div>Username: {this.props.profile.username}</div>
              <div>Email: {this.props.profile.email}</div>
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

export default connect(mapStateToProps)(UProfileView);
