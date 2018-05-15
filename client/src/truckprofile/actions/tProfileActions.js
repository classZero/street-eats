import store from '../../store'
import api from 'lib/api'

api.new('/api')

export function getProfile(username) {
    api.getTruckProfile(username).then(resp =>{
		store.dispatch({
			type: "GET_PROFILE",
			payload: resp
		})
	})
}

export function getReviews(username) {
	api.getTruckReviews(username).then(resp => {
		store.dispatch({
			type: "GET_REVIEWS",
			payload: resp
    })
	})
}

export function addFavorite(username, truckuser) {
	api.addFavorite(username, truckuser).then(resp => {
		store.dispatch({
			type: "ADDED_FAVORITE",
			payload: resp.message
    })
    setTimeout(function() {
      store.dispatch({
        type: "ADDED_FAVORITE",
        payload: ''
      })
    },3000)
	})
}

export function removeFavorite(username, truckuser, id) {
  api.removeFavorite(username, truckuser, id).then(resp => {
    store.dispatch({
      type: "REMOVED_FAVORITE",
      payload: resp.message
    })
    setTimeout(function() {
      store.dispatch({
        type: "REMOVED_FAVORITE",
        payload: ''
      })
    },3000)
  })
}

export function getIsFavorite(truckUsername, userUsername) {
  api.getIsFavorite(truckUsername, userUsername).then(resp => {
    store.dispatch({
      type: "IS_FAVORITE",
      payload: resp.isFavorite
    })
  })
}

export function submitReview(username, truckuser, reviewtext, rating) {
	api.addReview(username, truckuser, reviewtext, rating).then(resp => {
		store.dispatch({
			type: "ADDED_REVIEW",
			payload: resp
    })
    setTimeout(function() {
      store.dispatch({
        type: "ADDED_REVIEW",
        payload: ''
      })
    },3000)
	})
}
