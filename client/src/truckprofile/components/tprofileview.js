import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getProfile} from '../actions/tProfileActions'
import MapViewHome from '../../MapView/mapviewcomponents/MapsViewHome'

class TProfileView extends Component {

    componentDidMount(){
        getProfile(this.props.username) 
    }

    render() {
        return (
            <div>
                <MapViewHome />
                <div>Company name: {this.props.profile.companyname}</div>
                <div>Truck picture<img src={this.props.profile.logo} /></div>
                <div>About us: {this.props.profile.aboutus}</div>
                <div><img src={this.props.profile.menuurl} /></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile : state.tProfileReducer.profile,
        username: state.loginReducer.username
    }
}


export default connect(mapStateToProps)(TProfileView)
