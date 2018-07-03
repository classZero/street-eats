import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
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
      
      <div className="update-location-header">
        <Link to="/" id="update-location-back-btn">Back</Link>
        <h1>Update Location</h1>
      </div>
      <div className="update-location-body">
        <div className="timerange">
          <TimeRange
              minuteIncrement={30}
              startMoment={this.state.startTime}
              endMoment={this.state.endTime}
              onChange={this.returnFunction}
          />
        </div>

        <form onSubmit={this.handleSubmit}>
          <h4>Update Address:</h4>
          <div id="update-location-address-wrapper">
          <i className="fas fa-map-marker-alt"></i>
            <input onChange={this.handleChange} id="update-location-address" name="addy" autoComplete="off" type="text" placeholder="Street Address" value={this.state.addy} />
          </div>
          <h4>Additional Info:</h4>
          <div className="update-location-special-wrapper">
            <i className="far fa-star"></i>
            <input onChange={this.handleChange} id="update-location-special" name="special" autoComplete="off" style={{width:'500px'}} type="text" placeholder="Send your customers a custom message" value={this.state.special} />
          </div>

          <button type="submit" id="update-location-submit-btn">Submit</button>

        </form>
      </div>
    </div>
      
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default withRouter(connect(mapStateToProps)(MapViewInputs))
