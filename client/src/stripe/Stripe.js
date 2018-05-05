import React, { Component } from 'react'
import {StripeProvider} from 'react-stripe-elements'
import MyStoreCheckout from './StoreCheckout'
import AddressSection from './AddressSection'

const style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#32325d",
  }
}

export class Stripe extends Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey='pk_test_Vz1xjG6YyYwOir0PINnjIzbk'>
          <MyStoreCheckout />
        </StripeProvider>
      </div>
    )
  }
}

export default Stripe
