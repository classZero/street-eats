import React, {Component} from 'react'
import { connect } from 'react-redux'
import {removeFromCart} from '../actions/MenuViewActions'


class Cart extends Component{

  total = () => {
    const total = this.props.cart.reduce(function(total, item){
      return {itemPrice: total.itemPrice + item.itemPrice}
    }, {itemPrice: 0}).itemPrice.toFixed(2)

    return(
      <h3>${total}</h3>
    )
  }

  handleRemove = (e, itemIndex) => {
    e.preventDefault()
    removeFromCart(itemIndex)
  }

  handleCheckout = (e) => {
    e.preventDefault()
    console.log('checkout')
  }

  render(){
    return(
      <div className="testZone">
        <h1>Cart</h1>
        {this.props.cart.map((item, i) => {
          return(
            <div key={'cartitem-'+i}>
              {item.itemName} - ${item.itemPrice.toFixed(2)}
              <button onClick={ e => this.handleRemove(e, i)} >-</button>
            </div>
          )}
        )}
        {this.total()}
        <button onClick={this.handleCheckout} >Checkout</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.MenuViewReducer.cart
  }
}

export default connect(mapStateToProps)(Cart)