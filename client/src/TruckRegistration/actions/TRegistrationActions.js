import store from 'store'
import api from 'lib/api'
api.new('/api')


export function registerTruck(truckObj){
	api.registration(truckObj.username, truckObj.password, truckObj.email, "truck", truckObj.companyInfo).then(resp =>{
		console.log('in tactions:', resp)
		store.dispatch({
			type: 'REGISTER_TRUCK',
			payload: resp.data
		})
	})
}
