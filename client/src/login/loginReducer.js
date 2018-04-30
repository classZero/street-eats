const initialState = {
  isAuthenticated: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {...state, isAuthenticated: true}
    case "LOGOUT_USER":
      return {...state, isAuthenticated: false}
    default:
      return state
  }
}
