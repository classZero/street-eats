import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProfile } from '../actions/tProfileActions'
import { Link } from 'react-router-dom'
import star from '../../assets/images/star.svg'
import { getReviews } from '../actions/tProfileActions'
import { addFavorite } from '../actions/tProfileActions'
import './tprofile.css'
import HomeHeader from '../../headers/HomeHeader'

class TProfileView extends Component {

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

    render() {
        return (
              <div>
              <HomeHeader />

                <div className="tprofile-container">
                    <div className="tprofile-header">
                    <Link to="/" className="tprofile-back">Back</Link>
                    <p>{this.props.profile.companyname}</p>
                    </div>
                    <div className="tprofile-img-container"><img alt="logo" src={this.props.profile.logo} /></div>
                    <div className="tprofile-about-header">ABOUT US</div>
                    <div className="tprofile-about">{this.props.profile.aboutus}</div>
                    <div className="tprofile-menu"><img alt="menu" src={this.props.profile.menuurl} /></div>
                    {this.props.isAuth ? <div onClick={() => { this.handleFavClick(this.props.username, this.props.match.params.username) }}><img  alt='add favorite' style={{width: 50, height: 50}} src={star}/></div>:<div></div> }
                    <p className="tprofile-edit">{this.editTruckProfile(this.props.username)}</p>
                </div>

                <div>
                    {this.props.reviews.map((review, index) => {
                        return <div key={'review ' + index } ><p>{review.review}</p></div>
                    })}
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
        reviews: state.tProfileReducer.reviews
    }
}


export default connect(mapStateToProps)(TProfileView)
