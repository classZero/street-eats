// import io from 'socket.io-client'
import store from '../store'
//import socket from '../lib/socket'
import api from '../lib/api'
api.new('/api')

// const socket = io('/orders')

export function dispatchToTruck(order) {
  //socket.emit('order', order)
}

// socket.on('order', order => {
//   console.log('order received', order.cart)
//   order.truckId = order.cart[0].itemTruckId
//   order.orderedBy = order.cart[0].truckUserName
//   order.timestamp = new Date()
//   store.dispatch({
//     type: "SEND_ORDER",
//     payload: order
//   })
// })

export function addOrderToUserHistory(cart) {
  api.addOrderToUserHistory(cart).then(resp => {
    console.log('orderactions resp', resp)
  })
}

export function removeOrder() {

}
