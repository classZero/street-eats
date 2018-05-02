const initialState = {
  addy: '',
  profile: {},
  open: '',
  close: ''
}

export default function (state = initialState, action) {
	switch (action.type) {
    case 'ADDY_INPUT': 
      return {...state, addy: action.payload}
    case 'GET_CORDS':
      return {...state, profile: action.payload}
    case 'UPDATE_HOURS':
      return {...state, open: action.payload.opentime, close: action.payload.closetime}
	default:
		return state
	}
}
