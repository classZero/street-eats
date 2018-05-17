import React, {Component} from 'react'
import { connect } from 'react-redux'
import { slide as Menu } from 'react-burger-menu'
import {removeFromCart, viewCart} from 'MenuView/actions/MenuViewActions'

import Checkout from 'stripe/Checkout'

import {styles as cartStyles} from './cartMenuStyles'
import cartsvg from 'assets/images/cart.svg'

class Cart extends Component{
  static defaultProps = {
    cartView: false
  }
  
  state ={
    isVisible: false
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

    this.setState({
      isVisible: true
    })

    viewCart()
    removeFromCart(itemIndex)

  }
  

  render(){
    if(this.props.isAuthenticated && this.props.source === 'user'){
      return(
        <Menu noOverlay width={500} isOpen={ this.props.cartView } styles={cartStyles} customBurgerIcon={ <img src={cartsvg} alt="cart"/> } className={ "cart-sidebar" }>
          <div className="cart-container">
            {this.props.cartSource 
              ? <p className="cart-header">{this.props.cartSource} - Cart</p>
              : <p className="cart-header">{this.props.companyName} - Cart</p>
            }

            {this.props.cart.map((item, i) => {
              return(
                <div key={'cartitem-'+i} className="cart-item" >
                  {item.itemName} <span>${item.itemPrice.toFixed(2)}</span>
                  <button onClick={ e => this.handleRemove(e, i)} className="cart-remove-item-button" >-Remove Item</button>
                </div>
              )}
            )}
            { this.props.cart.length === 0
            ? <div className="checkout-button-wrapper" >Your cart is currently empty</div>
            :<div>
              <textarea className="cart-special-instructions" placeholder="Special Instructions" ></textarea>
              <h3>Total - ${this.total()}</h3>
              <div className='checkout-button-wrapper' >
                <Checkout 
                  name={this.props.cartSource} 
                  description={'Order No: 234576289'}
                  amount={this.total() * 100}
                  cart={this.props.cart}  
                />
              </div>
            </div>
            }
          </div>
        </Menu>
      )
    } else {
      return <div></div>
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.MenuViewReducer.cart,
    cartSource: state.MenuViewReducer.cartSource,
    cartView: state.MenuViewReducer.cartView,
    companyName: state.tProfileReducer.profile.companyname,
    isAuthenticated: state.loginReducer.isAuthenticated,
    source: state.loginReducer.source

  }
}

export default connect(mapStateToProps)(Cart)
