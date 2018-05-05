import store from 'store'
import api from 'lib/api'
api.new('/api')



export function registerUser(username, password, email, avatar){
	const type = 'user'
	api.registration(username, password, email, avatar, type).then(resp =>{
		console.log('in actions:', resp)
		store.dispatch({
			type: 'REGISTER_USER',
			payload: resp.data
		})
	})
}
