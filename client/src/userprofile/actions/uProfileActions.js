import store from '../../store'
import axios from 'axios'

export function getUserProfile() {            //username add as argument
    let username = 'johnny5'                    //remove when you add argument from above
    axios.get('/api/userprofile/' + username).then(resp => {
        store.dispatch({
            type: 'GET_USER_PROFILE',
            payload : resp.data
        })
    })
} 
