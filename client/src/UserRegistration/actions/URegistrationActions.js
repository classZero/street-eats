// import store from 'store'
// import axios from 'axios'

import api from 'lib/api'
api.new('/api')



export function registerUser(userObj){
	// console.log(userObj)
	api.registration(userObj.username, userObj.password, userObj.email, "user").then(resp =>{
		console.log(resp)
		// store.dispatch({
        //   type: "ADD_TOKEN",      //change here
        //   payload:resp.data
        // })
	})
}
