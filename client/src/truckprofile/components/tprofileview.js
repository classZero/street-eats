import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getProfile} from '../actions/tProfileActions'

class TProfileView extends Component {

    componentDidMount(){
        getProfile()
    }

    render() {
        console.log(this.props.profile)
        return (
            <div>gfggf</div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile : state.profile
    }
}


export default connect(mapStateToProps)(TProfileView)