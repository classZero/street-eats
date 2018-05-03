import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getProfile} from '../actions/tProfileActions'
import {Link, Redirect} from 'react-router-dom'

class TProfileView extends Component {

    componentDidMount(){
        getProfile(this.props.username)
    }

    render() {
        return (
            <div>{isAuth ?
                <div>
                    <div>Company name: {this.props.profile.companyname}</div>
                    <div>Truck picture<img src={this.props.profile.logo} /></div>
                    <div>About us: {this.props.profile.aboutus}</div>
                    <div><img src={this.props.profile.menuurl} /></div>
                    <Link to="/editprofile">Edit Profile</Link>
                    </div>: <Redirect to='/' />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        profile : state.tProfileReducer.profile,
        username: state.loginReducer.username,
        isAuth: state.loginReducer.isAuthenticated
    }
}


export default connect(mapStateToProps)(TProfileView)
