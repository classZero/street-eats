import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {convertAddy , postHours, postSpecial} from '../mapviewactions/mapactions'
import TimeRange from 'react-time-range'
import '../mapviewcomponents/mapviewinputs.css'



class MapViewInputs extends Component {
  state = {
    addy: '',
    open: '',
    close: '',
    special: '',
    startTime: moment().startOf('day').toString(),
    endTime: moment().startOf('day').toString()
  }

  handleSubmit = (e) => {
    let startTime = this.state.startTime
    let endTime = this.state.endTime
    e.preventDefault()
    convertAddy(this.state.addy)
    postHours(startTime, endTime)
    postSpecial(this.state.special)
    this.setState({
      addy: '',
      open: '',
      close: '',
      special: ''
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  returnFunction = (e) => {
    console.log(new Date(e.startTime), new Date(e.endTime))
    this.setState({
      startTime: e.startTime,
      endTime: e.endTime
    })
  }

  render () {
    return (
    <div className="mapinputs-container">
      
      <header>
        <h1>Update Location</h1>
      </header>

      <TimeRange
          minuteIncrement={30}
          startMoment={this.state.startTime}
          endMoment={this.state.endTime}
          onChange={this.returnFunction}
      />
      <form onSubmit={this.handleSubmit}>
        <label>Update Address:</label><input onChange={this.handleChange} name="addy" autoComplete="off" type="text" placeholder="street address" value={this.state.addy} />
        <label>Open Time:
        </label>
        <label>Close Time:
        </label>
        <h5>Optional Fields:</h5>
        <input onChange={this.handleChange} name="special" autoComplete="off" style={{width:'500px'}} type="text" placeholder="special info, to be seen by customers who click on your location EX. behind the target" value={this.state.special} />
        <br/>

        <button type="submit">Submit</button>

      </form>

    </div>
      
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(MapViewInputs)
