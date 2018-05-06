// import store from '../store'
import api from '../lib/api'
api.new('/api')

export function processPayment(data) {
  console.log('pay actions', data)
}
