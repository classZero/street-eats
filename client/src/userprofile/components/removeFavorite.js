import React, { Component } from 'react';
import { removeFavorite } from '../actions/uProfileActions' 
import {getFavorites} from '../actions/uProfileActions'

import './uprofile.css'


class RemoveFavorite extends Component {
    removeFavorite = (e) => {
        e.preventDefault()
        removeFavorite(this.props.user, this.props.truck, this.props.id)
        getFavorites(this.props.user)
    }
    render() {
        return (
            <div>
                <button onClick={this.removeFavorite} className="uprofile-remove-fav"><i className="far fa-times-circle"></i></button>
            </div>
        )
    }
}

export default RemoveFavorite
