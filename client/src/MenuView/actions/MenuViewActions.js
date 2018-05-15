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

function changeMessage (itemObj, currentTruck){
	clearCart()
	addToCart(itemObj, currentTruck)
	store.dispatch({
		type: 'ALERT',
		payload: ''
	})
}

function closeMessageBox () {
	store.dispatch({
		type: 'ALERT',
		payload: ''
	})
}

export function addToCart(itemObj, currentTruck, truckUserName){
	const cartSource = store.getState().MenuViewReducer.cartSource
	itemObj.truckUserName = truckUserName
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
				<div className="alert-message">Your cart contains items from another food truck. Please complete your current order or clear your cart to proceed.</div>
				<button onClick={closeMessageBox} className="alert-button-one">Close this window</button>
				<button onClick={() => changeMessage(itemObj, currentTruck)} className="alert-button-two">Clear cart and add item</button>
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

	if(newCart.filter((it,ind) => ind !== itemIndex).length === 0){
		store.dispatch({
			type: 'UPDATE_CART_SOURCE',
			payload: ''
		})
	}
}

export function clearCart(){
	store.dispatch({
		type: 'CLEAR_CART'
	})
}

export function viewCart(){
	store.dispatch({
		type: 'VIEW_CART'
	})
}

export function hideCart(){
	store.dispatch({
		type: 'HIDE_CART'
	})
}
