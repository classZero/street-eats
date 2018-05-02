import store from '../../store'
import axios from 'axios'

export function getProfile(username) {         //username --- add as argument
    // let username = "leo"                //remove when you add argument from above
    axios.get('/api/truckprofile/' + username).then(resp => {
        store.dispatch({
            type: 'GET_PROFILE',
            payload : resp.data
        })
    })
}
