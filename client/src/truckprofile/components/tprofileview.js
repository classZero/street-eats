import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfile, getReviews, addFavorite, submitReview } from '../actions/tProfileActions'
import { Link } from 'react-router-dom'
import star from '../../assets/images/star.svg'
import HomeHeader from '../../headers/HomeHeader'
import ReactStars from 'react-stars'
import MenuView from 'MenuView/components/MenuView'

import './tprofile.css'

class TProfileView extends Component {
    state = {
        reviewMenuToggle: 'menu',
        reviewtext : '',
        rating: null
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
            return  <div onClick={() => { this.handleFavClick(this.props.username, this.props.match.params.username) }}>
                      <img  alt='add favorite' style={{width: 50, height: 50}} src={star}/>
                    </div>
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

    ratingChanged = (newRating) => {
      this.setState({
        rating:newRating
      })
    }

    reviewForm(auth, source){
        if(auth && source === 'user') {
            return <div>
                      <form className="review-container" onSubmit={this.handleSubmit}>
                          <div>
                            <h4 className="review-title">Leave a review?</h4> 
                            <textarea className="review-textarea" onChange={this.handleChange} name='reviewtext' value={this.state.reviewtext} /> 
                          </div>
                          <ReactStars
                            count={5}
                            onChange={this.ratingChanged}
                            size={24}
                            value={this.state.rating}
                            color2={'#ffd700'} />
                          <button id="submit-review" type='submit'>Submit</button>
                      </form>
                   </div>
        } else if(auth === false) {
            return <div><p>Login or create account to leave a review</p></div>
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()  //rating going in
        submitReview(this.props.username, this.props.match.params.username, this.state.reviewtext, this.state.rating)
        this.setState({
            reviewtext : '',
            rating: ''
        })
        getReviews(this.props.match.params.username)
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
              <div>

                  <HomeHeader />

                  <div className="biggestContainer">
                      <div className="tprofile-container">
                          <div className="tprofile-header">
                            <Link to="/" className="tprofile-back">Back</Link>
                            <p>{this.props.profile.companyname}</p>
                            <p className="tprofile-edit">{this.editTruckProfile(this.props.username)}</p>
                            {this.favAbility(this.props.isAuth, this.props.source)}
                          </div>
                          <div className="tprofile-body-container">
                            <div className="tprofile-img-container"><img alt="logo" src={this.props.profile.logo} /></div>
                            <div className="tprofile-about-header">ABOUT US</div>
                            <div className="tprofile-about">{this.props.profile.aboutus}</div>
                            <div className="tprofile-menu"><img alt="menu" src={this.props.profile.menuurl} /></div>
                            {/* {this.favAbility(this.props.isAuth, this.props.source)} */}
                            {this.props.message ? <div>{this.props.message}</div>:<div></div>}
                          </div>
                      </div>

                      {this.state.reviewMenuToggle === 'menu' ? <MenuView toggle={this.toggleReviewMenu} /> :
                          <div className="tprofile-review-container">
                              <div className="tprofile-header menuview-header">
                                <p>Reviews</p>
                                <button onClick={this.toggleReviewMenu} className="menuview-toggle">View Menu</button>
                              </div>
                              <div className="tprofile-review-list-container">
                                {this.reviewForm(this.props.isAuth, this.props.source)}
                                {this.props.reviews.map((review, index) => {
                                    return <div key={'review ' + index } className="actual-review">
                                             <p>{review.review}</p>
                                             <ReactStars
                                                count={5}
                                                onChange={this.ratingChanged}
                                                edit={false}
                                                value={review.rating}
                                                size={24}
                                                color2={'#ffd700'} />
                                           </div>
                                })}
                              </div>
                          </div>}
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
        message : state.tProfileReducer.message,
    }
}


export default connect(mapStateToProps)(TProfileView)
