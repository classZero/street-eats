import store from '../../store'
import axios from 'axios'

export function getUserProfile() {
    axios.get('/api/userprofile').then(resp => {
        store.dispatch({
            type: 'GET_USER_PROFILE',
            payload : resp.data
        })
    })
} 