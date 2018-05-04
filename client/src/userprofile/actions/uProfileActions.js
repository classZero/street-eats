import store from '../../store'
import api from 'lib/api'
api.new('/api')


export function getUserProfile(username) {
    api.getUserProfile(username).then(resp =>{
		store.dispatch({
			type: 'GET_USER_PROFILE',
			payload: resp
		})
	})
}

