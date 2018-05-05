import React, { Component } from 'react'

export class AddressSection extends Component {
  render() {
    return (
      <div>
      <label>
        Address details
        <input type="text" placeholder="name"/>
        <input type="text" placeholder=" billing address"/>
      </label>
      </div>
    )
  }
}

export default AddressSection
