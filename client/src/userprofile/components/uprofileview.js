import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUserProfile} from '../actions/uProfileActions'
import {Redirect} from 'react-router-dom'
import {getFavorites} from '../actions/uProfileActions'
import '../../userprofile/components/uprofile.css'
import HomeHeader from '../../headers/HomeHeader'
import { Link } from 'react-router-dom'




class UProfileView extends Component {
    static defaultProps = {
      favorites: []
    }

    componentDidMount(){
        getUserProfile(this.props.username)
        getFavorites(this.props.username)
    }

    checkUser(auth, current, user) {
        if(auth && current === user) {
            return <div>
            {/* <div>Username: {this.props.profile.username}</div>
            <div>Email: {this.props.profile.email}</div>
            My Favorites:
            <div>
            {this.props.favorites.map((favorite, index) => {
                    return <div key={'favorite' + index} ><img src={favorite.companylogo} alt="logo"/>{favorite.companyname}</div>
                })}
            </div> */}
            <Link to='/editprofile'>Edit My Profile</Link>
            </div>
        } else {
            return <Redirect to='/' />
        }
    }

    render() {
        console.log(this.props)
        return (
          <div>
            <div>
              <HomeHeader />
            </div>
              <div>
            {this.props.isAuth ?
                <div className="uprofile-container">
                <div className="uprofile-username">Username: {this.props.profile.username}</div>
                <div className="uprofile-email">Email: {this.props.profile.email}</div>
                <p>My Favorites:</p>
                <div className="uprofile-favcontainer">
                {this.props.favorites.map((favorite, index) => {
                        return <div key={'favorite' + index} >{favorite.companylogo} {favorite.companyname}</div>
                    })}
                </div>
                <div className="uprofile-editbutton">
                {this.checkUser(this.props.isAuth, this.props.username, this.props.match.params.username)}
              </div>
                </div>: <Redirect to='/' />}
          </div>
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
