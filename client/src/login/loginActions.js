import store from '../store'
import api from '../lib/api'

api.new('/api')

export function login(username, password) {
  api.login(username, password).then(resp => {
    console.log('api login', resp.data)
  }).catch(err => {
      store.dispatch({
        type:"LOGIN_ERROR",payload:err
      })
      console.log('actions ' + err)
  })
}
