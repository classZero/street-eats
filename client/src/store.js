import {createStore, combineReducers} from 'redux'

import homeReducer from './home/homeReducer'
import loginReducer from './login/loginReducer'
import tProfileReducer from './truckprofile/reducers/tProfileReducer'
import uProfileReducer from './userprofile/reducers/uProfileReducer'

//import reducer here

const rootReducer = combineReducers({
  homeReducer,
  loginReducer,
  tProfileReducer,
  uProfileReducer
  //add your reducer here
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store
