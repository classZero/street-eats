import store from 'store'
import api from 'lib/api'
api.new('/api')



export function registerUser(userObj){
	api.registration(userObj.username, userObj.password, userObj.email, "user").then(resp =>{
		console.log('in actions:', resp)
		store.dispatch({
			type: 'REGISTER_USER',
			payload: resp.data
		})
	})
}
