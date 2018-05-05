import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProfile } from '../actions/tProfileActions'
import { Link } from 'react-router-dom'
import star from '../../assets/images/star.svg'
import { getReviews } from '../actions/tProfileActions'

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

    addFavorite() {
        console.log("div clicked")
    }

    render() {
        console.log(this.props.reviews)
        return (
            <div>

                <div>
                    <div>Company name: {this.props.profile.companyname}</div>
                    <div>Truck picture<img alt="logo" src={this.props.profile.logo} /></div>
                    <div>About us: {this.props.profile.aboutus}</div>
                    <div><img alt="menu" src={this.props.profile.menuurl} /></div>
                    <div onClick={this.addFavorite}><img style={{width: 50, height: 50}} src={star}/></div>
                    {this.editTruckProfile(this.props.username)}
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
