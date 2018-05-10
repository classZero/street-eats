import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import api from '../lib/api'
import {dispatchToTruck} from '../orders/orderActions'

const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'http://myapidomain.com'
  : 'http://api/localhost:3001/payments';

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_Vz1xjG6YyYwOir0PINnjIzbk';

const CURRENCY = 'USD';

const successPayment = data => {
  console.log('data',data)
  alert('Payment Successful')
  dispatchToTruck(data)
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = (amount, description, cart) => token =>
  api.payments(description, token.id, CURRENCY, amount, cart)
    .then(successPayment)
    .catch(errorPayment)

const Checkout = ({ name, description, amount, cart }) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={amount}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
    token={onToken(amount, description, cart)}
  />

export default Checkout;
