import React, { Component } from 'react'
import {convertAddy , postHours} from '../mapviewactions/mapactions'

class MapViewInputs extends Component {
  state = {
    addy: '',
    open: '',
    close: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    convertAddy(this.state.addy)
    postHours(this.state.open, this.state.close)
    this.setState({
      addy: '',
      open: '',
      close: ''
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

        <input onChange={this.handleChange} name="open" autoComplete="off" type="cell" placeholder="when will you open" value={this.state.open} />
        <input onChange={this.handleChange} name="close" autoComplete="off" type="cell" placeholder="when will you close" value={this.state.close} />
        
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
