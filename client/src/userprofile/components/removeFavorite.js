import React, { Component } from 'react';
import remove from '../../assets/images/remove.svg'
import { removeFavorite } from '../actions/uProfileActions' 
import {getFavorites} from '../actions/uProfileActions'




class RemoveFavorite extends Component {
    removeFavorite = (e) => {
        e.preventDefault()
        removeFavorite(this.props.user, this.props.truck)
        getFavorites(this.props.user)
    }
    render() {
        return (
            <div>
                <button onClick={this.removeFavorite}>Remove from my Favorites</button>
            </div>
        )
    }
}

export default RemoveFavorite