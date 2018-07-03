import store from '../../store'
import api from '../../lib/api'
api.new('/api')


export function getUserProfile(username) {
    api.getUserProfile(username).then(resp =>{
		store.dispatch({
			type: 'GET_USER_PROFILE',
			payload: resp
		})
	})
}

export function getFavorites(username) {
	api.getFavorites(username).then(resp => {
		store.dispatch({
			type: 'GET_FAVORITES',
			payload: resp.favorites
		})
	})
}

export function removeFavorite(user, truck, id) {
	api.removeFavorite(user, truck, id).then(resp => {
		store.dispatch({
			type: 'REMOVE_FAVORITE',
			payload: resp
		})
	})
}

export function getUsersReviews(username) {
	api.getUsersReviews(username).then(resp => {
		store.dispatch({
			type: 'GET_USERS_REVIEWS',
			payload: resp
		})
	})
}

export function deleteReview(id) {
	api.deleteReview(id).then(resp => {
		store.dispatch({
			type: 'DELETE_REVIEW',
			payload: resp
		})
	})
}

export function editUserReview(id, text) {
	api.editUserReview(id, text).then(resp => {
		store.dispatch({
			type: 'EDIT_REVIEW',
			payload: resp
		})
	})
}

export function getOrders(username) {
	api.getOrders(username).then(resp => {
		store.dispatch({
			type: 'GET_ORDERS',
			payload: resp
		})
	})
}
