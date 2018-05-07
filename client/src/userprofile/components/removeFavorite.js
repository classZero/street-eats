import React, { Component } from 'react';
import remove from '../../assets/images/remove.svg'




class RemoveFavorite extends Component {
    removeFavorite = (e) => {
        e.preventDefault()
        console.log("button clicked")
    }
    render() {

        return (
            <div>
                <button onClick={this.removeFavorite}>Click me</button>
            </div>
        )
    }
}

export default RemoveFavorite