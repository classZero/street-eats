const initialState = {
  addy: '',
  mappop: [],
  open: '',
  close: '',
  special: ''
}

export default function (state = initialState, action) {
	switch (action.type) {
    case 'ADDY_INPUT': 
      return {...state, addy: action.payload}
    case 'GET_CORDS':
      return {...state, mappop: action.payload}
    case 'UPDATE_HOURS':
      return {...state, open: action.payload.opentime, close: action.payload.closetime}
    case 'UPDATE_SPECIAL':
      return {...state, special: action.payload.specialinfo}
	default:
		return state
	}
}
