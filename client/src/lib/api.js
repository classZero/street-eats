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
        store.dispatch({
          type: "LOGIN_MESSAGE",
          payload: resp.data.message
        })
        setTimeout(function() {
          store.dispatch({
            type: "LOGIN_MESSAGE",
            payload: ''
          })
        }, 3000)
    })
}

instance.logout = function() {
  this.token = null
  this.interceptors.request.eject(this.tokenInterceptor)
  this.interceptors.request.eject(this.registerInterceptor)
  window.localStorage.removeItem('token')
  store.dispatch({
    type: "LOGOUT_USER",
    payload: "Thanks for checking out Street Eats"
  })
  setTimeout(function() {
    store.dispatch({
      type: "LOGOUT_USER",
      payload: ''
    })
  },3000)
}

instance.registration = function (username, password, email, avatar, type, companyName, companyLogo, menu, aboutus) {
    return this.post(this.getRegisterPath(), {username, password, email, avatar, type, companyName, companyLogo, menu, aboutus})
        .then(resp => {
            window.localStorage.setItem('token', resp.data.token)
            this.registerInterceptor = this.interceptors.request.use(config => {
              config.headers['Authorization'] = 'Bearer ' + resp.data.token
              return config
            })
            store.dispatch({
              type: "LOGIN_USER",
              payload: resp.data
            })
            return resp.data
        }
    )
}

instance.getTruckProfile = function (username) {
  return this.get('/truckprofile/' + username).then(resp => {
    return resp.data
  })
}

instance.getTruckReviews = function(username) {
  return this.get('/truckreviews/' + username).then(resp => {
    return resp.data
  })
}

instance.getIsFavorite = function(truck, user) {
  return this.get(`/isfavorite/${truck}/${user}`).then(resp => {
    return resp.data
  })
}

instance.getUserProfile = function (username) {
  return this.get('/userprofile/' + username).then(resp => {
    return resp.data
  })
}

instance.getFavorites = function(username) {
  return this.get('/userfavorites/' + username).then(resp => {
    return resp.data
  })
}

instance.addFavorite = function(username, truckuser) {
  return this.post('/addfavorite/', {username, truckuser}).then(resp => {
    return resp.data
  })
}

instance.removeFavorite = function(username, truckuser, id) {
  return this.post('/removefavorite/', {username, truckuser, id}).then(resp => {
    return resp.data
  })
}

instance.editTruckProfile = function(name, logo, aboutus, menuurl, username) {
  return this.post('/editTruckProfile', {name, logo, aboutus, menuurl, username}).then(resp => {
    return resp.data
  })
}

instance.changeSortView = function (sortType) {
  return this.get('/truckdata/' + sortType).then(resp => {
    return resp.data
  })
}

instance.payments = function (description, token, currency, amount, cart) {
  return this.post('/payments', {description, token, currency, amount, cart}).then(resp => {
    return resp.data
  })
}

instance.addReview = function (username, truckuser, reviewtext, rating) {
  return this.post('/addreview', {username, truckuser, reviewtext, rating}).then(resp => {
    return resp.data.message
  })
}

instance.getUsersReviews = function(username) {
  return this.get('/getUsersReviews/' + username).then(resp => {
    return resp.data.reviews
  })
}

instance.deleteReview = function(id) {
  return this.post('/deleteReview/' + id).then(resp => {
    return resp.message
  })
}

instance.editUserReview = function(id, text) {
  return this.post('/editReview', {id, text}).then(resp => {
    return resp.message
  })
}

instance.updateLocation = function (lat, long, username) {
  return this.post('/uplocale', {lat, long, username}).then(resp => {
    return resp.data
  })
}

instance.removeLocation = function (username) {
  return this.post('/removelocale', {username}).then(resp => {
    return resp.data
  })
}

instance.addOrderToUserHistory = function (cart) {
  return this.post('/addOrderToUserHistory', {cart}).then(resp => {
    return resp.data
  })
}

instance.getOrders = function (username) {
  return this.get('/getOrders', {username}).then(resp => {
    return resp.data
  })
}

export default instance
