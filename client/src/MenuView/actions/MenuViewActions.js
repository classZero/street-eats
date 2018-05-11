import React from 'react'
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

function changeMessage (itemObj){
	store.dispatch({
		type: 'UPDATE_CART_SOURCE',
		payload: 'foo'
	})
	store.dispatch({
		type: 'ALERT',
		payload: <div>look, it worked <button onClick={closeMessageBox}>this closes this box</button></div>
	})
	store.dispatch({
		type: 'ADD_TO_CART',
		payload: itemObj
	})
}

function closeMessageBox () {
	store.dispatch({
		type: 'ALERT',
		payload: ''
	})
}

export function addToCart(itemObj, currentTruck = 'foo'){
	const cartSource = store.getState().MenuViewReducer.cartSource
	console.log(cartSource, currentTruck)
	return cartSource === '' ?
		(
			store.dispatch({
				type: 'UPDATE_CART_SOURCE',
				payload: currentTruck
			}),
			store.dispatch({
				type: 'ADD_TO_CART',
				payload: itemObj
			})
		)
	: cartSource === currentTruck ?
		store.dispatch({
			type: 'ADD_TO_CART',
			payload: itemObj
		})
	: store.dispatch({
		type: 'ALERT',
		payload: 
			<div>
				hello world 
				<button onClick={closeMessageBox}>click to close without adding to cart</button>
				<button onClick={() => changeMessage(itemObj)}>click me to add thing to cart</button>
			</div>
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