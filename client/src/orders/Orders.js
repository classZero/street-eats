import React, { Component } from 'react'
import {sendOrder} from './orderActions'
import {connect} from 'react-redux'
import './orders.css'

export class Orders extends Component {

  static DefaultProps = {
    orders: []
  }

  render() {
    return (
      <div className="order-view-container">
        <div className="order-header-container">
          <h1 className="order-header-title">Your Orders</h1>
        </div>

        <div>
          
        </div>
        <Child />
        <div className="order-body-container">
        {this.props.orders.map((order, i) => {
          return  <div className="order-container" key={'order' + i}>
                    <h2>order number 23</h2>
                    <h3>{order.timestamp}</h3>
                    <h3>{order.orderBy}</h3>
                    {order.orders.map((item, j, items) => {
                      return <p key={'item' + j}>{items[j]}</p>
                    })}
                    <button className="order-complete-btn"> mark as done</button>
                  </div>
        })}

        </div>
      </div>
    )
  }
}


export class Child extends Component {
  state = {
    message: ''
  }
  handleAwesomeChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  isAwesome = (e) => {
    e.preventDefault()
    sendOrder(this.state.message)
    this.setState({
      message: ''
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.isAwesome}>
          <input type="text" onChange={this.handleAwesomeChange} placeholder="message" name="message" value={this.state.message}/>
          <button type="submit">Sub it</button>
        </form>

      </div>
    )
  }
};

function mapStateToProps(state) {
  console.log(state)
  return {
    orders : state.ordersReducer.orders
  }
}

export default connect(mapStateToProps)(Orders)
