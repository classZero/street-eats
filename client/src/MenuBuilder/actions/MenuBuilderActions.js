import api from '../../lib/api'

api.new('/api')

export function addItem(menuObj){
	return api.post('/addmenuitem', menuObj).then(resp => console.log(resp.data))
}

export function removeItem(itemID){
	return api.post('/removeitem', {itemID}).then(resp => console.log(resp.data))
}
