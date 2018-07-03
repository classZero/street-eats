import store from '../store'
import api from '../lib/api'
import Geocode from 'react-geocode'
import socket from '../lib/socket'


api.new('/api')

export function changeSortView(type) {
  api.get(`/truckdata/${type}`).then(resp => {
    const promises = resp.data.results.map(truck => {
      return new Promise((resolve, reject) => {
        Geocode.fromLatLng(truck.lat, truck.lng).then(response => {
          truck.formattedAddress = response.results[0].formatted_address
          // console.log(truck.formattedAddress)
          resolve(truck)
        })
      })
    })

    Promise.all(promises).then(values => {
      store.dispatch({
        type: 'SORTED_TRUCK_DATA',
        payload : {values: values, type: type}
      })
    })
  })
}

export function updateLocation(lat, long, username, id) {

  //socket.emit('create truck', {id})

  api.updateLocation(lat, long, username).then(resp => {
    store.dispatch({
      type: "UPDATE_LOCATION",
      payload: resp.message
    })
    setTimeout(function() {
      store.dispatch({
        type: "UPDATE_LOCATION",
        payload: ''
      })
    },3000)
  })
}

export function removeLocation(username) {
  api.removeLocation(username).then(resp => {
    store.dispatch({
      type: "REMOVE_TRUCK",
      payload: resp.message
    })
    setTimeout(function() {
      store.dispatch({
        type: "REMOVE_TRUCK",
        payload: ''
      })
    },3000)
  })
}
