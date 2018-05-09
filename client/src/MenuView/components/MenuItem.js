import React, {Component} from 'react'
import { connect } from 'react-redux'

import {addToCart} from '../actions/MenuViewActions'

class MenuItem extends Component{
  state = {}

  handleAdd = (e) => {
    e.preventDefault()
    addToCart(this.props.item)
  }

  render(){
    return(
      <div className="menuview-menu-item">
        <h3>{this.props.item.itemName}</h3>
        <h3>${this.props.item.itemPrice}</h3>
        <h4>{this.props.item.itemType}</h4>
        <p>{this.props.item.itemDescription}</p>
        <button onClick={this.handleAdd} >+</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

// export default connect(mapStateToProps)(MenuItem)
export default MenuItem
