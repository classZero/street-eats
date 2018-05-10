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
                    <p>Truck ID: {order.truckId}</p>
                    <p>Order age: <TimeAgo date={order.timestamp} minPeriod={10} /></p>
                    {order.order.map((orderItem, j) => {
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


// export class Child extends Component {
//   state = {
//     message: ''
//   }
//   handleAwesomeChange = (e) => {
//     e.preventDefault()
//     this.setState({
//       [e.target.name]:e.target.value
//     })
//   }
//   isAwesome = (e) => {
//     e.preventDefault()
//     // sendOrder(this.state.message)
//     this.setState({
//       message: ''
//     })
//   }
//   render() {
//     return (
//       <div>
//         <form onSubmit={this.isAwesome}>
//           <input type="text" onChange={this.handleAwesomeChange} placeholder="message" name="message" value={this.state.message}/>
//           <button type="submit">Sub it</button>
//         </form>

//       </div>
//     )
//   }
// };

function mapStateToProps(state) {
  console.log(state)
  return {
    orders : state.ordersReducer.orders
    
  }
}

export default connect(mapStateToProps)(Orders)

// orders
// :
// Array(1)
// 0
// :
// Array(1)
// 0
// :
// ItemType
// :
// "entree"
// id
// :
// 3
// itemDescription
// :
// "Locally sourced free-range Cockroaches"
// itemName
// :
// "Fried Free-Range Cockroach"
// itemPrice
// :
// 10
// itemTruckId
// :
// 21
