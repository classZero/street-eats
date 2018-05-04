import store from 'store'
import api from 'lib/api'

api.new('/api')

export function addItem(){
	api.post('/addmenuitem').then
}