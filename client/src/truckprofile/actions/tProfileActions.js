import store from '../../store'
import api from 'lib/api'
api.new('/api')

export function getProfile(username) {
    api.getTruckProfile(username).then(resp =>{
		store.dispatch({
			type: 'GET_PROFILE',
			payload: resp
		})
	})
}
