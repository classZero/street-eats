const initialState = {
  addy: '',
  lat: '',
  lng: ''
}

export default function (state = initialState, action) {
	switch (action.type) {
    case 'ADDY_INPUT': 
      return {...state, addy: action.payload}
	default:
		return state
	}
}
