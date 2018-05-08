import React, { Component } from 'react';
import { deleteReview } from '../actions/uProfileActions'
import { getUsersReviews } from '../actions/uProfileActions'
import { editUserReview } from '../actions/uProfileActions'






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
            <div>{this.state.edit ?
                <div><div><form onSubmit={this.handleSubmit}><textarea placeholder={this.props.review} onChange={this.handleChange} name='editReviewText' value={this.state.editReviewText}/><button type='submit'>Submit</button><button onClick={this.editReview} >Cancel</button></form></div></div>:
                <div><div>{this.props.companyname}:<br/>{this.props.review}<br/> </div>
                <button onClick={this.editReview} >Edit Review</button><button onClick={this.deleteReview} >Delete Review</button></div>}
            </div>
        );
    }
}


export default ChangeReview