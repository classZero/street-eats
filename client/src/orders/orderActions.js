import io from 'socket.io-client'
import store from '../store'
const socket = io.connect('http://192.168.50.34:3001')
// const socket = io.connect('http://10.68.0.239:3001')
// const socket = io.connect('http://localhost:3001')

// const socket = io('/orders')

export function dispatchToTruck(order) {
  socket.emit('order', order)
}

socket.on('order', order => {
  console.log('order received', order.cart)
  const truckIdOrderedFrom = order.cart[0].itemTruckId
  const timestamp = new Date()
  store.dispatch({
    type: "SEND_ORDER",
    payload: order.cart
  })
})


export function removeOrder() {

}
