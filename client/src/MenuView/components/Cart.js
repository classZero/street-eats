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
        <h1>Cart</h1>
        <h2>{this.props.companyName}</h2>
        {this.props.cart.map((item, i) => {
          return(
            <div key={'cartitem-'+i}>
              {item.itemName} - ${item.itemPrice.toFixed(2)}
              <button onClick={ e => this.handleRemove(e, i)} >-</button>
            </div>
          )}
        )}
        <h3>${this.total()}</h3>
        {/* <button onClick={this.handleCheckout} >Checkout</button> */}
        <Checkout 
          name={this.props.companyName} 
          description={'Order No: Foo'}
          amount={this.total() * 100}
          cart={this.props.cart}
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
