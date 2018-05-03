import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getProfile} from '../actions/tProfileActions'
import {Link} from 'react-router-dom'
import MapViewHome from '../../MapView/mapviewcomponents/MapsViewHome'
import MapViewInputs from '../../MapView/mapviewcomponents/MapViewInputs'

class TProfileView extends Component {

    componentDidMount(){
        getProfile(this.props.username)
    }

    render() {
        return (
            <div>
                <MapViewInputs />
              
              <div style={{display: 'flex'}}>
                <MapViewHome />
                <div>
                  <div>Company name: {this.props.profile.companyname}</div>
                  <div>Truck picture<img src={this.props.profile.logo} alt=""/></div>
                  <div>About us: {this.props.profile.aboutus}</div>
                  <div><img src={this.props.profile.menuurl} alt=""/></div>
                  <Link to="/editprofile">Edit Profile</Link>
                </div>
              </div>
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
