import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUserProfile} from '../actions/uProfileActions'
import {Redirect} from 'react-router-dom'



class UProfileView extends Component {

    componentDidMount(){
        // console.log(this.props.username)
        getUserProfile(this.props.username)
    }

    render() {
        return (
            <div>{this.props.isAuth ?
                <div>
                <div>Username: {this.props.profile.username}</div>
                <div>Email: {this.props.profile.email}</div>
                </div>: <Redirect to='/' />}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile : state.uProfileReducer.profile,
        username : state.loginReducer.username,
        email: state.uProfileReducer.email,
        isAuth: state.loginReducer.isAuthenticated
    }
}

export default connect(mapStateToProps)(UProfileView);
