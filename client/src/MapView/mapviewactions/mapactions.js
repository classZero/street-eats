import Geocode from 'react-geocode'
import store from '../../store'
import axios from 'axios'

export function convertAddy(addy) {
 const username = store.getState().loginReducer.username
  Geocode.fromAddress(addy).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location
      axios.post('/api/updatelocation/' + username + '/' + lat + '/' + lng).then(resp => {

    }).catch(err => {
      console.log(err)
    })
  })
}

export function postHours(open, close) {
  const username = store.getState().loginReducer.username
  const opentime = open
  const closetime = close
  
  axios.post('/api/updatehours/' + username + '/' + opentime + '/' + closetime).then(resp => {
    store.dispatch({
      type: 'UPDATE_HOURS',
      payload: resp.data
    })
  }).catch(err => {
    console.log(err)
  })
}

export function getCords(username) {
axios.get('/api/cords/' + username).then(resp => {
    store.dispatch({
        type: 'GET_CORDS',
        payload : resp.data
    })
})
}
