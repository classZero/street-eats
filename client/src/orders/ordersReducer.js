const initialState = {
  orders: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case "SEND_ORDER":
      console.log('payload',action.payload)
      return {...state, orders: [...state.orders, action.payload]}
    default:
      return state
  }
}
