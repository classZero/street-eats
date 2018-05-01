import React, { Component } from 'react'

class MapViewInputs extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  render () {
    return (
    <div>

      <form onSubmit={this.handleSubmit}>

        <input onChange={this.handleChange} autoComplete="off" type="text" placeholder="street address" />
        <select>
          <option value="street">Street</option>
          <option value="way">Way</option>
          <option value="road">Road</option>
          <option value="avenue">Avenue</option>
          <option value="boulevard">Boulevard</option>
          <option value="drive">Drive</option>
          <option value="lane">Lane</option>
          <option value="terrace">Terrace</option>
          <option value="court">Court</option>
        </select>
        <input onChange={this.handleChange} autoComplete="off" type="cell" placeholder="when will you open" />
        <input onChange={this.handleChange} autoComplete="off" type="cell" placeholder="when will you close" />
        
        <h5>Optional Fields:</h5>
        <input onChange={this.handleChange} autoComplete="off" style={{width:'500px'}} type="text" placeholder="special info, to be seen by customers who click on your location EX. behind the target" />
        <br/>

        <button type="submit">Submit</button>

      </form>

    </div>
      
    )
  }
}

export default MapViewInputs
