const initialState = {
	profile_image: '',
	username : getTokenUsername(),
	isAuthenticated: window.localStorage.getItem('token') ? true : false,
	source : getTokenSource()
}


function getTokenUsername() {
  if(window.localStorage.getItem('token')) {
    const username = jwt.decode(window.localStorage.getItem('token')).user
    return username
  } else {
    return ""
  }
}


function getTokenSource() {
  if(window.localStorage.getItem('token')) {
    const source = jwt.decode(window.localStorage.getItem('token')).source
    return source
  } else {
    return ""
  }
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
