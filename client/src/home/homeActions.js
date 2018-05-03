import store from '../store'
import api from '../lib/api'
import Geocode from 'react-geocode'

api.new('/api')

export function getTruckData() {
  api.get('/truckdata').then(resp => {
    const promises = resp.data.results.map(truck => {
      return new Promise((resolve, reject) => {
        Geocode.fromLatLng(truck.lat, truck.lng).then(response => {
          truck.formattedAddress = response.results[0].formatted_address
          console.log(truck)
          resolve(truck)
        })
      })
    })

    Promise.all(promises).then(values => {
      store.dispatch({
        type: 'GET_TRUCK_DATA',
        payload : values
      })
    })
  })
}
