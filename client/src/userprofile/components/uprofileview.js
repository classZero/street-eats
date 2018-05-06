import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUserProfile} from '../actions/uProfileActions'
import {Redirect} from 'react-router-dom'
import {getFavorites} from '../actions/uProfileActions'



class UProfileView extends Component {

    componentDidMount(){
        getUserProfile(this.props.username)
        getFavorites(this.props.username)
    }

    render() {
        console.log(this.props.favorites)
        return (
            <div>{this.props.isAuth ?
                <div>
                <div>Username: {this.props.profile.username}</div>
                <div>Email: {this.props.profile.email}</div>
                My Favorites:
                <div>
                {this.props.favorites.map((favorite, index) => {
                        return <div key={'favorite' + index} >{favorite.companylogo} {favorite.companyname}</div>
                    })}
                </div>
                </div>: <Redirect to='/' />}
            </div>
        )
    }
}

function mapStateToProps(state) {
  console.log(state)
    return {
        profile : state.uProfileReducer.profile,
        username : state.loginReducer.username,
        email: state.uProfileReducer.email,
        isAuth: state.loginReducer.isAuthenticated,
        favorites: state.uProfileReducer.favorites
    }
}

export default connect(mapStateToProps)(UProfileView);
