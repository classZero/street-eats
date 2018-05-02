const initialState = {
  truckData: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_TRUCK_DATA":
      console.log('action', action)
      return {...state, truckData: action.payload}
    default:
      return state
  }
}
