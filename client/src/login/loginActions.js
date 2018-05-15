import store from '../store'
import api from '../lib/api'

api.new('/api')

export function login(username, password) {
  api.login(username, password).then(resp => {
  }).catch(err => {
    if(err.response) {
      store.dispatch({
        type:"LOGIN_ERROR",
        payload: err.response.data.message
      })
      setTimeout(function() {
        store.dispatch({
          type:"LOGIN_ERROR",
          payload: ''
        })
      },3000)
      console.log(err.response.data.message)
    }
  })
}
