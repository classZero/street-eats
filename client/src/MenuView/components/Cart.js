import React, {Component} from 'react'
import { connect } from 'react-redux'
import {removeFromCart} from '../actions/MenuViewActions'

import Checkout from 'stripe/Checkout'

class Cart extends Component{
  state ={
    visible: false
  }

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

  render(){
    if(this.props.isAuthenticated && this.props.source === 'user'){
      return(
        <div className="testZone">
          <p className="cart-header" >{this.props.companyName} - Cart</p>
          {this.props.cart.map((item, i) => {
            return(
              <div key={'cartitem-'+i} className="cart-item" >
                {item.itemName} <span>${item.itemPrice.toFixed(2)}</span>
                <button onClick={ e => this.handleRemove(e, i)} className="cart-remove-item-button" >-Remove From Cart</button>
              </div>
            )}
          )}
          <textarea className="cart-special-instructions" placeholder="Special Instructions" ></textarea>
          <h3>Total - ${this.total()}</h3>
          <div className='checkout-button-wrapper' >
            <Checkout 
              name={this.props.companyName} 
              description={'foo: bar'}
              amount={this.total() * 100}
              cart={this.props.cart}
            />
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.MenuViewReducer.cart,
    companyName: state.tProfileReducer.profile.companyname,
    isAuthenticated: state.loginReducer.isAuthenticated,
    source: state.loginReducer.source
  }
}

export default connect(mapStateToProps)(Cart)
