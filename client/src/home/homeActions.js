import store from '../store'
import api from '../lib/api'
import Geocode from 'react-geocode'

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

export function updateLocation(lat, long, username) {
  api.updateLocation(lat, long, username).then(resp => {
    
  })
}

export function removeLocation(username) {
  api.removeLocation(username).then(resp => {

  })
}
