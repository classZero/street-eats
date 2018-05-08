import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
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
    e.preventDefault()
    let startTime = this.state.startTime
    let endTime = this.state.endTime
    convertAddy(this.state.addy)
    postHours(startTime, endTime)
    postSpecial(this.state.special)
    this.setState({
      addy: '',
      open: '',
      close: '',
      special: ''
    })
    this.props.history.push('/')
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
      
      <div className="timerange">
        <TimeRange
            minuteIncrement={30}
            startMoment={this.state.startTime}
            endMoment={this.state.endTime}
            onChange={this.returnFunction}
        />
      </div>

      <form onSubmit={this.handleSubmit}>
        <h4>Update Address:</h4><input onChange={this.handleChange} name="addy" autoComplete="off" type="text" placeholder="Street Address" value={this.state.addy} />
        <h4>Optional Fields:</h4>
        <input onChange={this.handleChange} name="special" autoComplete="off" style={{width:'500px'}} type="text" placeholder="Special info, to be seen by customers who click on your location" value={this.state.special} />
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

export default withRouter(connect(mapStateToProps)(MapViewInputs))
