import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUserProfile} from '../actions/uProfileActions'
import {Redirect} from 'react-router-dom'
import {getFavorites} from '../actions/uProfileActions'
import { getUsersReviews } from '../actions/uProfileActions'
import '../../userprofile/components/uprofile.css'
import HomeHeader from '../../headers/HomeHeader'
import { Link } from 'react-router-dom'
import RemoveFavorite from './removeFavorite'
import ChangeReview from './changeReview'




class UProfileView extends Component {
    static defaultProps = {
      favorites: []
    }

    componentDidMount(){
        getUserProfile(this.props.username)
        getFavorites(this.props.username)
        getUsersReviews(this.props.username)
    }

    checkUser(auth, current, user) {
        if(auth && current === user) {
            return <div className="uprofile-container">
                <div className="uprofile-username">Username: {this.props.profile.username}</div>
                <div className="uprofile-email">Email: {this.props.profile.email}</div>
                <div className="uprofile-fav-container-header">My Favorites:</div>
                <div className="uprofile-favcontainer">
                {this.props.favorites.length > 1 ? 
                this.props.favorites.map((favorite, index) => {
                        return  <Link to={'/truckprofile/' + favorite.username} key={'favorite' + index} className="uprofile-fav">
                                  <div className="uprofile-fav-right">
                                    <img src={favorite.companylogo} alt="logo" className="uprof-fav-img"/>
                                    <h3>{favorite.companyname}</h3>
                                    <RemoveFavorite truck={favorite.username} user={this.props.username} />
                                  </div>
                                </Link>
                })
                : <h3 className="uprofile-fav-warning">You have not favorited anything yet</h3> }
                </div>
                <div className="uprofile-editbutton">
                    <Link to='/editprofile'>Edit My Profile</Link>
                </div>
                <div>
                    My Reviews:
                    <div>
                        {this.props.reviews.map((review, index) => {
                            return <ChangeReview key={'review' + index} companyname={review.companyname} review={review.review} id={review.id} username={this.props.username}/>
                        })}
                    </div>

                </div>
            </div>
        } else {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
          <div>
            <div>
              <HomeHeader />
            </div>
            <div>
                {this.checkUser(this.props.isAuth, this.props.username, this.props.match.params.username)}
            </div>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile : state.uProfileReducer.profile,
        username : state.loginReducer.username,
        email: state.uProfileReducer.email,
        isAuth: state.loginReducer.isAuthenticated,
        favorites: state.uProfileReducer.favorites,
        reviews: state.uProfileReducer.reviews
    }
}

export default connect(mapStateToProps)(UProfileView);
