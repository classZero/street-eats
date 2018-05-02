import React, { Component } from 'react'
import {convertAddy} from '../mapviewactions/mapactions'

class MapViewInputs extends Component {
  state = {
    addy: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    convertAddy(this.state.addy)
    this.setState({
      addy: ''
    })
    console.log(this.state.addy)
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

        <input onChange={this.handleChange} name="addy" autoComplete="off" type="text" placeholder="street address" value={this.state.addy} />
        {/* <select>
          <option value={this.state.addy}>Street</option>
          <option value={this.state.addy}>Way</option>
          <option value={this.state.addy}>Road</option>
          <option value={this.state.addy}>Avenue</option>
          <option value={this.state.addy}>Boulevard</option>
          <option value={this.state.addy}>Drive</option>
          <option value={this.state.addy}>Lane</option>
          <option value={this.state.addy}>Terrace</option>
          <option value={this.state.addy}>Court</option>
        </select> */}
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
