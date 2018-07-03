import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {getUserProfile} from '../actions/uProfileActions'
import {Redirect} from 'react-router-dom'
import {getFavorites, getUsersReviews, getUserProfile, getOrders} from '../actions/uProfileActions'
// import { getUsersReviews } from '../actions/uProfileActions'
import '../../userprofile/components/uprofile.css'
import HomeHeader from '../../headers/HomeHeader'
import { Link } from 'react-router-dom'
import RemoveFavorite from './removeFavorite'
import ChangeReview from './changeReview'


class UProfileView extends Component {
    static defaultProps = {
      favorites: [{username: null}],
    }

    componentDidMount(){
        getUserProfile(this.props.username)
        getFavorites(this.props.username)
        getUsersReviews(this.props.username)
        getOrders(this.props.username)
    }

    checkUser(auth, current, user) {
        if(auth && current === user) {
            return <div className="uprofile-container">
                        <div className="uprofile-container-header">
                            <div className="uprofile-button-container">
                                <Link to="/" id="uprofile-back-btn">Back</Link>
                                {/* <Link to='/editprofile' id="uprofile-edit-btn">Edit My Profile</Link> */}
                            </div>
                            <div className="uprofile-username">Username: {this.props.profile.username}</div>
                            <div className="uprofile-email">Email: {this.props.profile.email}</div>
                        </div>
                        <div className="uprofile-container-body">
                            <div className="uprofile-fav-container-header">My Favorites:</div>
                            <div className="uprofile-favcontainer">
                                {this.props.favorites[0].username !== null ? 
                                this.props.favorites.map((favorite, index) => {
                                    return  <Link to={'/truckprofile/' + favorite.username} key={'favorite' + index} className="uprofile-fav">
                                                <div className="uprofile-fav-right">
                                                    <img src={favorite.companylogo} alt="logo" className="uprof-fav-img"/>
                                                    <h3>{favorite.companyname}</h3>
                                                    <RemoveFavorite truck={favorite.username} user={this.props.username} id={favorite.id}/>
                                                </div>
                                            </Link>
                                })
                                : <h3 className="uprofile-fav-warning">You have not favorited anything yet</h3> }
                            </div>

                            <div className="uprofile-review-container">
                                <div className="uprofile-review-container-header">My Reviews:</div>
                                <div className="uprofile-review-items-container">
                                    {this.props.reviews.length > 0 ? 
                                    this.props.reviews.map((review, index) => {
                                        return <ChangeReview key={'review' + index} companyname={review.companyname} review={review.review} id={review.id} username={this.props.username}/>
                                    })
                                    : <h3 className="uprofile-fav-warning">You have not reviewed anything yet</h3>}
                                </div>

                            </div>

                            <div className="uprofile-review-container">
                                <div className="uprofile-review-container-header">My Orders:</div>
                                <div className="uprofile-review-items-container">
                                    {this.props.orders.length > 0 ?
                                    this.props.orders.map((order, index) => {
                                        console.log(order)
                                         return <div key={'order' + order.id}>
                                                    <h3>{order.itemName}</h3>
                                                    <p>{order.itemPrice}</p>
                                                </div>
                                    })
                                    : <h3 className="uprofile-fav-warning">You have not ordered anything yet</h3>}
                                </div>
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
    console.log(state.uProfileReducer.orders)
    return {
        profile : state.uProfileReducer.profile,
        username : state.loginReducer.username,
        email: state.uProfileReducer.email,
        isAuth: state.loginReducer.isAuthenticated,
        favorites: state.uProfileReducer.favorites,
        reviews: state.uProfileReducer.reviews,
        orders: state.uProfileReducer.orders
    }
}

export default connect(mapStateToProps)(UProfileView);
