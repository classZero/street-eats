import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getProfile} from '../actions/tProfileActions'
import {Link, Redirect} from 'react-router-dom'

class TProfileView extends Component {

    componentDidMount(){
        getProfile(this.props.match.params.username)
    }

    editTruckProfile(username) {
        if(username === this.props.match.params.username) {
            return <Link to="/editprofile">Edit Profile</Link>
        }
    }

    render() {
        return (
            <div>

                <div>
                    <div>Company name: {this.props.profile.companyname}</div>
                    <div>Truck picture<img alt="logo" src={this.props.profile.logo} /></div>
                    <div>About us: {this.props.profile.aboutus}</div>
                    <div><img alt="menu" src={this.props.profile.menuurl} /></div>
                    {this.editTruckProfile(this.props.username)}
                </div>

            </div>
        )
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
