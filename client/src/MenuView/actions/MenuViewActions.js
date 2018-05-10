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

export function addToCart(itemObj){
	store.dispatch({
		type: 'ADD_TO_CART',
		payload: itemObj
	})
}

export function totalItems(){

}

export function removeFromCart(itemIndex){
	const newCart = store.getState().MenuViewReducer.cart	

	store.dispatch({
		type: 'REMOVE_FROM_CART',
		payload: newCart.filter((it, ind)=> ind !== itemIndex)
	})
}

export function clearCart(){
	store.dispatch({
		type: 'CLEAR_CART'
	})
}