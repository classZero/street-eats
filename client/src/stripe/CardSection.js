import React, { Component } from 'react'
import {CardElement} from 'react-stripe-elements'

export class CardSection extends Component {
  render() {
    return (
      <div>
      <label>
        Card details
        <CardElement style={{base: {fontSize: '20px'}}} />
      </label>
      </div>
    )
  }
}

export default CardSection
