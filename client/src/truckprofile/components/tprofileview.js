import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getProfile} from '../actions/tProfileActions'

class TProfileView extends Component {
    static defaultProps = {
        profile : {} 
    }

    componentDidMount(){
        getProfile()
    }

    render() {
        console.log(this.props.profile)
        return (
            <div>
                <div>{this.props.profile.name}</div>
                <div>{this.props.profile.phone}</div>
                <div>{this.props.profile.website}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile : state.profile
    }
}


export default connect(mapStateToProps)(TProfileView)