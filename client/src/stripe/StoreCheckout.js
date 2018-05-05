import React, { Component } from 'react'
import {Elements} from 'react-stripe-elements'
import InjectedCheckoutForm from './CheckoutForm'

export class MyCheckoutStore extends Component {
  render() {
    return (
      <div>
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </div>
    )
  }
}

export default MyCheckoutStore
