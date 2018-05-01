import Geocode from 'react-geocode'
import store from '../../store'

export function convertAddy(addy) {
  store.dispatch({
    type: 'ADDY_INPUT',
    payload: addy
  })
Geocode.fromAddress(addy).then(
  response => {
    const { lat, lng } = response.results[0].geometry.location
    console.log(lat, lng)
})
}
