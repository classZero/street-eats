// import store from 'store'
// import axios from 'axios'

import api from 'lib/api'
api.new('/api')



export function registerTruck(truckObj){
	// console.log(truckObj)
	api.registration(truckObj.username, truckObj.password, truckObj.email, "truck").then(resp =>{
		console.log(resp)
		// store.dispatch({
        //   type: "ADD_TOKEN",      //change here
        //   payload:resp.data
        // })
	})
}

export function testCall(){
	api.get('/testcall').then(resp => console.log(resp.data)).catch(err => console.log(err))
}