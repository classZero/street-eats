import store from 'store'
import api from 'lib/api'

api.new('/api')

export function getMenu(username){
	return api.get('/getmenu/' + username).then(resp => {
		store.dispatch({
			type: 'GET_MENU',
			payload: resp.data.menu
		})
	})
}