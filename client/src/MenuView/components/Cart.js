import React, {Component} from 'react'
import { connect } from 'react-redux'
import {removeFromCart} from '../actions/MenuViewActions'

import Checkout from 'stripe/Checkout'

class Cart extends Component{

  total = () => {
    return (
      this.props.cart.reduce(function(total, item){
        return {itemPrice: total.itemPrice + item.itemPrice}
      }, {itemPrice: 0}).itemPrice.toFixed(2)
    )
  }

  handleRemove = (e, itemIndex) => {
    e.preventDefault()
    removeFromCart(itemIndex)
  }

  // handleCheckout = (e) => {
  //   e.preventDefault()
  //   console.log('checkout')
  // }

  render(){
    return(
      <div className="testZone">
        <p className="cart-header" >{this.props.companyName} - Cart</p>
        {this.props.cart.map((item, i) => {
          return(
            <div key={'cartitem-'+i} className="cart-item" >
              {item.itemName} - ${item.itemPrice.toFixed(2)}
              <button onClick={ e => this.handleRemove(e, i)} className="cart-remove-item-button" >-Remove From Cart</button>
            </div>
          )}
        )}
        <h3>Total - ${this.total()}</h3>
        <Checkout 
          name={this.props.companyName} 
          description={'foo: bar'}
          amount={this.total() * 100}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.MenuViewReducer.cart,
    companyName: state.tProfileReducer.profile.companyname
  }
}

export default connect(mapStateToProps)(Cart)