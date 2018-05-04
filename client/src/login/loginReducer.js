import jwt from 'jsonwebtoken'


const initialState = {
  isAuthenticated: window.localStorage.getItem('token') ? true : false,
  username: getTokenUsername(),
  source: getTokenSource()
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
