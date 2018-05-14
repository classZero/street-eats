import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProfile } from '../actions/tProfileActions'
import { Link } from 'react-router-dom'
import star from '../../assets/images/star.svg'
import { getReviews } from '../actions/tProfileActions'
import { addFavorite } from '../actions/tProfileActions'
import './tprofile.css'
import HomeHeader from '../../headers/HomeHeader'
import { submitReview } from '../actions/tProfileActions'

import MenuView from 'MenuView/components/MenuView'

import {hideCart} from 'MenuView/actions/MenuViewActions'

class TProfileView extends Component {
    state = {
        reviewMenuToggle: 'menu',
        reviewtext : ''
    }

    componentDidMount(){
        console.log('truck mounted')
        getProfile(this.props.match.params.username)
        getReviews(this.props.match.params.username)
    }

    componentWillUnmount(){
        hideCart()
        console.log('truck unmounting')
        
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


    reviewForm(auth, source){
        if(auth && source === 'user') {
            return <div>
            <form onSubmit={this.handleSubmit}>
            <div>Leave A Review: <textarea onChange={this.handleChange} name='reviewtext' value={this.state.reviewtext} /> </div>
                <button type='submit'>Submit</button>
            </form>
            {this.props.reviewmessage ? <div>{this.props.reviewmessage}</div>:<div></div>}
        </div>
        } else if(auth === false) {
            return <div><p>Login or create account to leave a review</p></div>
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        submitReview(this.props.username, this.props.match.params.username,this.state.reviewtext)
        this.setState({
            reviewtext : ''
        })
        getReviews(this.props.match.params.username)

    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    cartHider(){
        hideCart()
    }

    render() {
        return (
              <div>
                  <HomeHeader />

                  <div className="biggestContainer">

                    <div className="tprofile-container">
                        <div className="tprofile-header">
                          <Link to="/" className="tprofile-back" onClick={this.cartHider}>Back</Link>
                          <p>{this.props.profile.companyname}</p>
                        </div>
                        <div className="tprofile-body-container">
                          <div className="tprofile-img-container"><img alt="logo" src={this.props.profile.logo} /></div>
                          <div className="tprofile-about-header">ABOUT US</div>
                          <div className="tprofile-about">{this.props.profile.aboutus}</div>
                          <div className="tprofile-menu"><img alt="menu" src={this.props.profile.menuurl} /></div>
                          {this.favAbility(this.props.isAuth, this.props.source)}
                          {this.props.message ? <div>{this.props.message}</div>:<div></div>}
                          <p className="tprofile-edit">{this.editTruckProfile(this.props.username)}</p>
                        </div>
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
                            {this.reviewForm(this.props.isAuth, this.props.source)}
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
        message : state.tProfileReducer.message,
        reviewmessage : state.tProfileReducer.reviewmessage
    }
}


export default connect(mapStateToProps)(TProfileView)
