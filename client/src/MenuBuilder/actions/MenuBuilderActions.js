import store from 'store'
import api from 'lib/api'

api.new('/api')

export function addItem(menuObj){
	api.post('/addmenuitem', menuObj).then(resp => console.log(resp.data))
}

export function getMenu(username){
	return api.get('/getmenu/' + username)
}