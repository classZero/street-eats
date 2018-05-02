import React, { Component } from 'react'
import {convertAddy , postHours, postSpecial} from '../mapviewactions/mapactions'

class MapViewInputs extends Component {
  state = {
    addy: '',
    open: '',
    close: '',
    special: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    convertAddy(this.state.addy)
    postHours(this.state.open, this.state.close)
    postSpecial(this.state.special)
    this.setState({
      addy: '',
      open: '',
      close: '',
      special: ''
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
        <input onChange={this.handleChange} name="special" autoComplete="off" style={{width:'500px'}} type="text" placeholder="special info, to be seen by customers who click on your location EX. behind the target" value={this.state.special} />
        <br/>

        <button type="submit">Submit</button>

      </form>

    </div>
      
    )
  }
}

export default MapViewInputs
