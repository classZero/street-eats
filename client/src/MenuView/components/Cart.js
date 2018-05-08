import React, {Component} from 'react'
import { connect } from 'react-redux'

class Cart extends Component{

  total = () => {
    const total = this.props.cart.reduce(function(total, item){
      return {itemPrice: total.itemPrice + item.itemPrice}
    }, {itemPrice: 0}).itemPrice.toFixed(2)
    return(
      <h3>${total}</h3>
    )
  }

  render(){
    return(
      <div className="testZone">
        <h1>Cart</h1>
        {this.props.cart.map((item, i) => {
          return(
            <div key={'cartitem-'+i}>
              {item.itemName} - {item.itemPrice}
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