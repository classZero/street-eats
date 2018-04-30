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
            <div>
                <div>Company name: {this.props.profile.companyname}</div>
                <div>Truck picture<img src={this.props.profile.truckpic} /></div>
                <div>About us: {this.props.profile.aboutus}</div>
                <div>Menu <img src={this.props.profile.menuurl} /></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile : state.tProfileReducer.profile
    }
}


export default connect(mapStateToProps)(TProfileView)