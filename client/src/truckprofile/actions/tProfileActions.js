import store from '../../store'
import axios from 'axios'

export function getProfile(username) {
    axios.get('/api/truckprofile/' + username).then(resp => {
        store.dispatch({
            type: 'GET_PROFILE',
            payload : resp.data
        })
    })
}
