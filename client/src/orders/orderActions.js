import io from 'socket.io-client'
import store from '../store'
// const socket = io.connect('http://192.168.50.34:3001')
const socket = io.connect('http://10.68.0.239:3001')


export function sendOrder(orders) {
  console.log('ordering',orders)
  const orderedBy = 'kevin'
  const timestamp = new Date()
  socket.emit('order', {orders: ['1', '2', '3', '4'], orderedBy: orderedBy, timestamp: timestamp})
}

socket.on('orderPlaced', (order) => {
  console.log('actions', order)
  store.dispatch({
    type: "SEND_ORDER",
    payload: order
  })
})
