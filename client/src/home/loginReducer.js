const initialState = {
  isAuthenticated: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {...state, isAuthenticated: true}
    default:
      return state
  }
}
