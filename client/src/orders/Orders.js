import React, { Component } from 'react'
import {removeOrder} from './orderActions'
import {connect} from 'react-redux'
import TimeAgo from 'react-timeago'
import './orders.css'

export class Orders extends Component {

  static DefaultProps = {
    orders: []
  }

  handleRemoveOrder = (e) => {
    e.preventDefault()
    removeOrder()
  }

  render() {
    return (
      <div className="order-view-container">
        <div className="order-header-container">
          <h1 className="order-header-title">Your Orders</h1>
        </div>

        <div className="order-body-container">
        {this.props.orders.map((order, i) => {
          return  <div className="order-container" key={'order' + i}>
                    <span>Ordered By: {order.orderedBy}</span>
                    <p>Order age: <TimeAgo date={order.timestamp} minPeriod={10} /></p>
                    {order.cart.map((orderItem, j) => {
                    return <div key={'key' + j}>
                            <h2>{orderItem.itemName}</h2>
                            
                           </div>})}
       
                           <button onClick={this.handleRemoveOrder} className="order-complete-btn">Mark as done</button>
                  </div>
        })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    orders : state.ordersReducer.orders
    
  }
}

export default connect(mapStateToProps)(Orders)
