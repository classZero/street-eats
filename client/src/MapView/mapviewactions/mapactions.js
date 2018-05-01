import Geocode from 'react-geocode'
import store from '../../store'
import axios from 'axios'

export function convertAddy(addy) {
 const username = store.getState().loginReducer.username
  Geocode.fromAddress(addy).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location
      axios.post('/api/updatelocation/' + username + '/' + lat + '/' + lng).then(resp => {
        
    })
  })
}
