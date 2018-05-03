import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import Datetime from 'react-datetime'
import InputMoment from 'input-moment'
import {convertAddy , postHours, postSpecial} from '../mapviewactions/mapactions'
import TimePicker from 'react-bootstrap-time-picker'
import TimeRange from 'react-time-range';



class MapViewInputs extends Component {
  state = {
    addy: '',
    open: '',
    close: '',
    special: '',
    startTime: '0',
    endTime: '0'
  }

  handleSubmit = (e) => {
    let startTime = new Date(this.state.startTime)
    let endTime = new Date(this.state.endTime)
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
    // if (e.startTime !== null) {
      this.setState({
        startTime: e.startTime,
        endTime: e.endTime
      })
      
    // }
    // if (e.endTime !== null) {
    //   this.setState({
    //     endTime: e.endTime
    //   })
    // }
    // console.log(this.state.startTime, this.state.endTime)
    
  }

  render () {
    return (
    <div>
      <TimeRange
          startMoment={this.state.startTime}
          endMoment={this.state.endTime}
          onChange={this.returnFunction}
      />
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} name="addy" autoComplete="off" type="text" placeholder="street address" value={this.state.addy} />
        <label>Start Time:
        <TimePicker onChange={this.handleStartTimeChange} name="start" value={this.state.startTime} step={1}/>
        </label>
        <label>End Time:
        <TimePicker onChange={this.handleEndTimeChange} name="end" value={this.state.endTime}/>
        </label>
        {/* <input onChange={this.handleChange} name="open" autoComplete="off" type="cell" placeholder="when will you open" value={this.state.open} /> */}
        {/* <input onChange={this.handleChange} name="close" autoComplete="off" type="cell" placeholder="when will you close" value={this.state.close} /> */}
        
        <h5>Optional Fields:</h5>
        <input onChange={this.handleChange} name="special" autoComplete="off" style={{width:'500px'}} type="text" placeholder="special info, to be seen by customers who click on your location EX. behind the target" value={this.state.special} />
        <br/>

        <button type="submit">Submit</button>

      </form>

    </div>
      
    )
  }
}

// class Timer extends Component {
//   state = {
//     secondsElapsed: 0,
//     secondsSinceMidnight: 0
//   }
//   makeActive = () => {
//     console.log(this.props.startTime)
//     console.log(this.state.secondsSinceMidnight)
//     if (this.props.startTime === this.state.secondsSinceMidnight) {
//       console.log('start')
//     }
//   }
//   makeInactive = () => {
//     if (this.props.endTime === this.state.endTime) {
//       console.log('end')
//     }
//   }
//   tick = () => {
//     this.setState({
//       secondsElapsed: this.state.secondsElapsed + 1
//     })
//     this.secondsSinceMidnight()
//     this.makeActive()
//   }
//   componentDidMount = () => {
//     this.interval = setInterval(this.tick, 1000)
//     this.makeInactive()
//   }
//   componentWillUnmount = () => {
//     clearInterval(this.interval)
//   }
//   secondsSinceMidnight = () => {
//     var now = new Date(),
//     then = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       0,0,0),
//     diff = now.getTime() - then.getTime(); // difference in milliseconds
//     const formatted = moment.utc(diff).format('HH:mm:ss')
//     // console.log(formatted)
//     this.setState({
//       secondsSinceMidnight: diff/1000
//     })
//   }
//   render() {
//     return (
//       <div>
//         <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
//         <div>Seconds since midnight: {this.state.secondsSinceMidnight}</div>
//         <div>Start Time: {this.props.startTime}</div>
//         <div>End Time: {this.props.endTime}</div>
//       </div>
//     )
//   }
// }
//when start time === seconds since midnight, call function to add active status
//do opposite for end time

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(MapViewInputs)
