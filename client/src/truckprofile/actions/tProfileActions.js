import store from '../../store'
import axios from 'axios'

export function getProfile() {
    axios.get('/api/truckprofile').then(resp => {
        store.dispatch({
            type: 'GET_PROFILE',
            payload : resp.data
        })
    })
}