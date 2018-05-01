import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getProfile} from '../actions/tProfileActions'

class TProfileView extends Component {

    componentDidMount(){
        getProfile(this.props.username)
    }

    render() {
        // console.log(this.props.username)
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
  // console.log('tprofview ' + JSON.stringify(state.loginReducer.username))
    return {
        profile : state.tProfileReducer.profile,
        username: state.loginReducer.username
    }
}


export default connect(mapStateToProps)(TProfileView)
