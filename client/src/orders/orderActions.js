import io from 'socket.io-client'
import store from '../store'
import socket from '../lib/socket'

// const socket = io('/orders')

export function dispatchToTruck(order) {
  socket.emit('order', order)
}

socket.on('order', order => {
  console.log('order received', order.cart)
  order.truckId = order.cart[0].itemTruckId
  order.timestamp = new Date()
  store.dispatch({
    type: "SEND_ORDER",
    payload: order.cart
  })
})


export function removeOrder() {

}
