import store from '../../store'
import api from 'lib/api'
api.new('/api')

export function getProfile(username) {
    api.getTruckProfile(username).then(resp =>{
		store.dispatch({
			type: 'GET_PROFILE',
			payload: resp
		})
	})
}

export function getReviews(username) {
	api.getTruckReviews(username).then(resp => {
		store.dispatch({
			type: 'GET_REVIEWS',
			payload: resp
		})
	})
}

export function addFavorite(username, truckuser) {
	api.addFavorite(username, truckuser).then(resp => {
		store.dispatch({
			type: 'ADDED_FAVORITE',
			payload: resp.message
		})
	})
}

export function submitReview(username, truckuser, reviewtext) {
	api.addReview(username, truckuser, reviewtext).then(resp => {
		// console.log(resp)
		// store.dispatch({
		// 	type: 'ADDED_REVIEW',
		// 	payload
		// })
	})
}
