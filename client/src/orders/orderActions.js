import io from 'socket.io-client'
import store from '../store'
// const socket = io.connect('http://192.168.50.34:3001')
const socket = io.connect('http://10.68.0.239:3001')
// const socket = io.connect('http://localhost:3001')

export function dispatchToTruck(data) {
  console.log('big success')
  const order = data.cart
  
  socket.emit('order', order)
}

socket.on('orderPlaced', (order) => {
  console.log('actions', order)
  const truckIdOrderedFrom = order[0].itemTruckId
  const timestamp = new Date()
  store.dispatch({
    type: "SEND_ORDER",
    payload:{order: order, truckId: truckIdOrderedFrom , timestamp: timestamp}
  })
})

export function removeOrder() {

}
