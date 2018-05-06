const initialState = {
  truckData: [],
  sortType: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_TRUCK_DATA":
      return {...state, truckData: action.payload}
    case "SORTED_TRUCK_DATA":
      return {...state, truckData: action.payload.values,
                        sortType: action.payload.type}
    default:
      return state
  }
}
