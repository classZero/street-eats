import React, { Component } from 'react'
import uuid from 'uuid'
import Checkout from './Checkout'

import './stripe.css'

export class Stripe extends Component {
  state = {
    name: '',
    address: '',
    amount: '',
    orderNum: ''
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className="stripe-wrapper">
        <form onSubmit={this.handleSubmit}>
          <div className="address-wrapper">
            <label>
              Address details
              <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.handleChange}/>
              <input type="text" placeholder="billing address" name="address" value={this.state.address} onChange={this.handleChange}/>
              <input type="text" placeholder="amount" name="amount" value={this.state.amount} onChange={this.handleChange}/>
              <input type="text" placeholder="order number" name="orderNum" value={this.state.orderNum} onChange={this.handleChange}/>
            </label>
            TEST CARD NUMBER 4242 4242 4242 4242
          </div>
          <Checkout
            name={'Street Eats'}
            description={`Order No: ${uuid(this.state.orderNum)}`}
            amount={this.state.amount * 100}
          />
        </form>
      </div>
    )
  }
}

export default Stripe
