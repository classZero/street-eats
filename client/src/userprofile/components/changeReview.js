import React, { Component } from 'react'
import { deleteReview } from '../actions/uProfileActions'
import { getUsersReviews } from '../actions/uProfileActions'
import { editUserReview } from '../actions/uProfileActions'

import './uprofile.css'

class ChangeReview extends Component {
    state = {
        editReviewText: "",
        edit: false
    }

    deleteReview = () => {
        deleteReview(this.props.id)
        getUsersReviews(this.props.username)
    }

    editReview = () => {
        console.log("edit clicked")
        this.setState({
            edit : !this.state.edit
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        editUserReview(this.props.id, this.state.editReviewText)
        this.setState({
            editReviewText: "",
            edit: false
        })
        getUsersReviews(this.props.username)
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            editReviewText : e.target.value
        })
    }


    render() {
        return (
            <div className="changeReview-container">{this.state.edit ?
                <div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <textarea placeholder={this.props.review} 
                                      onChange={this.handleChange} 
                                      name='editReviewText' 
                                      value={this.state.editReviewText}/>
                            <button type='submit'>Submit</button>
                            <button onClick={this.editReview}>Cancel</button>
                        </form>
                    </div>
                </div> :
                <div className="review-wrapper">
                    <div className="review-item-header">
                        <h3 className="review-company-name">{this.props.companyname}</h3>
                        <div className="review-button-wrapper">
                            <button onClick={this.editReview}><i className="fas fa-edit"></i></button>
                            <button onClick={this.deleteReview}><i className="far fa-times-circle"></i></button>
                        </div>
                    </div>
                        <p className="review-content">{this.props.review}</p>
                </div>}
            </div>
        )
    }
}


export default ChangeReview
