import axios from 'axios'
import store from '../store'

const instance = axios.create()

instance.tokenPath = '/login'
instance.registerPath = '/registration'
instance.token = window.localStorage.getItem('token') || null

instance.new = function(url = '/') {
  this.defaults.baseURL = url

  if (this.token) {
    this.tokenInterceptor = this.interceptors.request.use(config => {
      config.headers['Authorization'] = 'Bearer ' + this.token
      return config
    })
  }
}

instance.setTokenPath = function(path) {
  this.tokenPath = path
}

instance.getTokenPath = function() {
  return this.tokenPath
}

instance.setRegisterPath = function(path) {
  this.registerPath = path
}

instance.getRegisterPath = function() {
  return this.registerPath
}

instance.login = function (username, password) {
    return this.post(this.getTokenPath(), {username, password})
        .then(resp => {
        window.localStorage.setItem('token', resp.data.token)
        this.tokenInterceptor = this.interceptors.request.use(config => {
          config.headers['Authorization'] = 'Bearer ' + resp.data.token
          return config
        })
        store.dispatch({
          type: "LOGIN_USER",
          payload: resp.data
        })
    })
}

instance.logout = function() {
  this.token = null
  this.interceptors.request.eject(this.tokenInterceptor)
  this.interceptors.request.eject(this.registerInterceptor)
  window.localStorage.removeItem('token')
  store.dispatch({
    type: "LOGOUT_USER",
    payload: ''
  })
}

instance.registration = function (username, password, email, type, companyName, companyLogo, menu, aboutus) {
    return this.post(this.getRegisterPath(), {username, password, email, type, companyName, companyLogo, menu, aboutus})
        .then(resp => {
            console.log('in api:', resp)
            window.localStorage.setItem('token', resp.data.token)
            this.registerInterceptor = this.interceptors.request.use(config => {
              config.headers['Authorization'] = 'Bearer ' + resp.data.token
              return config
            })
            return resp.data
        }
    )
}

instance.getTruckProfile = function (username) {
  return this.get('/truckprofile/' + username)
  .then(resp => {
    return resp.data
  })
}

instance.getTruckReviews = function(username) {
  return this.get('/truckreviews/' + username)
  .then(resp => {
    return resp.data.reviews
  })
}


instance.getUserProfile = function (username) {
  // console.log(username)
  return this.get('/userprofile/' + username)
  .then(resp => {
    return resp.data
  })
}

instance.editTruckProfile = function(name, logo, aboutus, menuurl) {
  return this.post('/editTruckProfile', {name, logo, aboutus, menuurl})
  .then(resp => {
    return resp.data
  })
}

instance.getTruckData = function () {
  console.log('api get truck data')
  return this.get('/truckdata').then(resp => {
  return resp.data
  })
}  

export default instance
