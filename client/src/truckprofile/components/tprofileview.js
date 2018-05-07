import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProfile } from '../actions/tProfileActions'
import { Link } from 'react-router-dom'
import star from '../../assets/images/star.svg'
import { getReviews } from '../actions/tProfileActions'
import { addFavorite } from '../actions/tProfileActions'
import './tprofile.css'
import HomeHeader from '../../headers/HomeHeader'

import MenuView from 'MenuView/components/MenuView'

class TProfileView extends Component {
    state = {
        reviewMenuToggle: 'review'
    }

    componentDidMount(){
        getProfile(this.props.match.params.username)
        getReviews(this.props.match.params.username)
    }

    editTruckProfile(username) {
        if(username === this.props.match.params.username) {
            return <Link to="/editprofile">Edit Profile</Link>
        }
    }

    handleFavClick = (username, truckuser) => {
        addFavorite(username, truckuser)
    }
    favAbility(isAuth, source) {
        if(isAuth && source === 'user') {
            return <div onClick={() => { this.handleFavClick(this.props.username, this.props.match.params.username) }}><img  alt='add favorite' style={{width: 50, height: 50}} src={star}/></div>
        } else {
            return <div></div>
        }
    }

    toggleReviewMenu = (e) => {
        e.preventDefault()
        if (this.state.reviewMenuToggle !== 'menu'){
            this.setState({
                reviewMenuToggle: 'menu'
            })
        } else {
            this.setState({
                reviewMenuToggle: 'review'
            })
        }
    }

    render() {
        console.log(this.props.message)
        return (
              <div>
                  <HomeHeader />

                  <div className="biggestContainer">

                    <div className="tprofile-container">
                        <div className="tprofile-header">
                        {/* <Link to="/" className="tprofile-back">Back</Link> */}
                        <p>{this.props.profile.companyname}</p>
                        </div>
                        <div className="tprofile-img-container"><img alt="logo" src={this.props.profile.logo} /></div>
                        <div className="tprofile-about-header">ABOUT US</div>
                        <div className="tprofile-about">{this.props.profile.aboutus}</div>
                        <div className="tprofile-menu"><img alt="menu" src={this.props.profile.menuurl} /></div>
                        {this.favAbility(this.props.isAuth, this.props.source)}
                        {this.props.message ? <div>{this.props.message}</div>:<div></div>}
                        <p className="tprofile-edit">{this.editTruckProfile(this.props.username)}</p>
                    </div>

                    { this.state.reviewMenuToggle === 'menu' ? <MenuView toggle={this.toggleReviewMenu} /> :
                        <div className="tprofile-review-container">
                            <div className="tprofile-header menuview-header">
                              <p>Reviews</p>
                              <button onClick={this.toggleReviewMenu} className="menuview-toggle">View Menu</button>
                            </div>
                            {this.props.reviews.map((review, index) => {
                                return <div key={'review ' + index } className="actual-review"><p>{review.review}</p></div>
                            })}
                        </div>
                    }
                  </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile : state.tProfileReducer.profile,
        username: state.loginReducer.username,
        isAuth: state.loginReducer.isAuthenticated,
        reviews: state.tProfileReducer.reviews,
        source : state.loginReducer.source,
        message : state.tProfileReducer.message
    }
}


export default connect(mapStateToProps)(TProfileView)
