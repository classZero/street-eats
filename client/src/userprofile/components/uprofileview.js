import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUserProfile} from '../actions/uProfileActions'



class UProfileView extends Component {

    componentDidMount(){
        getUserProfile()
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
        profile : state.uProfileReducer.profile
    }
}

export default connect(mapStateToProps)(UProfileView);