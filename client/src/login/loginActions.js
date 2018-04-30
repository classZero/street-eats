import store from '../store'
// import axios from 'axios'
import api from '../lib/api'

api.new('/api')

// export function login(username, password) {
//   console.log('login actions ')
//   axios.post('/api/login', {username, password}).then(resp => {
//     console.log('loginActions post successful')
//     console.log(resp.data)
//     // window.localStorage.setItem('token', resp.data.token)
//     // axios.tokenInterceptor = axios.interceptors.request.use(config => {
//     //   config.headers['Authorization'] = 'Bearer ' + resp.data.token
//     //   return config
//     // })
//     store.dispatch({
//       type: "USER_LOGIN",
//       payload:resp.data
//     })
//   })
// }


export function login(username, password, fn) {
  api.login(username, password).then(() => {
      // fn('/')
  }).catch(err => {
      store.dispatch({type:"LOGIN_ERROR",payload:err})
      console.log('actions ' + err)
  })
}
