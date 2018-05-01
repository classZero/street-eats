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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile : state.uProfileReducer.profile,
        username : state.loginReducer.username
    }
}

export default connect(mapStateToProps)(UProfileView);
