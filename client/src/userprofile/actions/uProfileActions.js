import store from '../../store'
import axios from 'axios'

export function getUserProfile(username) {
    axios.get('/api/userprofile/' + username).then(resp => {
        store.dispatch({
            type: 'GET_USER_PROFILE',
            payload : resp.data
        })
    })
} 
