import store from '../../store'
import api from 'lib/api'
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

export function removeFavorite(user, truck) {
	api.removeFavorite(user, truck).then(resp => {
		store.dispatch({
			type: 'REMOVE_FAVORITE',
			payload: resp
		})
	})
}

