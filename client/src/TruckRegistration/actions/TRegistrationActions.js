import store from 'store'
import api from 'lib/api'
api.new('/api')


export function registerTruck(username, password, email, companyName, companyLogo, menu, aboutus){
  const type = 'truck'
  const avatar = null
	api.registration(username, password, email, avatar, type, companyName, companyLogo, menu, aboutus).then(resp =>{
		console.log('in tactions:', resp)
		store.dispatch({
			type: 'REGISTER_TRUCK',
			payload: resp.data
		})
	})
}

export function addImage(url) {
  store.dispatch({
      type: "ADD_IMAGE_URL",
      payload: url
  })  
}
