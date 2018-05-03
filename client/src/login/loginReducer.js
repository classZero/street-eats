const initialState = {
  isAuthenticated: window.localStorage.getItem('token') ? true : false,
  username: '',
  source: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {...state, isAuthenticated: true,
                        username: action.payload.user,
                        source: action.payload.source
                      }
    case "LOGOUT_USER":
      return {...state, isAuthenticated: false,
                        username: '',
                        source: ''}
    default:
      return state
  }
}
