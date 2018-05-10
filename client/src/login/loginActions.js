import store from '../store'
import api from '../lib/api'

api.new('/api')

export function login(username, password) {
  api.login(username, password).then(resp => {

  }).catch(err => {
      store.dispatch({
        type:"LOGIN_ERROR",payload:err
      })
      store.dispatch({
        type: "LOGIN_FAILURE",
        payload: 'Invalid username and/or password'
      })
      setTimeout(function() {
        store.dispatch({
          type: "LOGIN_FAILURE",
          payload: ''
        })
      }, 3000)
      console.log('actions ' + err)
  })
}
