const initialState = {
  profile_image: ''
}

export default function (state = initialState, action) {
	switch(action.type) {
		case 'REGISTER_TRUCK':
      return state
    // case "ADD_IMAGE":
    //   return {...state, profile_image: action.payload}
		default:
			return state
	}
}
