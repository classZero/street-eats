import store from '../store'
import api from '../lib/api'

api.new('/api')

export function logoutUser() {
  api.logout().then(resp => {

  }).catch(err => {
      store.dispatch({type:"LOGOUT_ERROR",payload:err})
      console.log('logout ' + err)
  })
}
