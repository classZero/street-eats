import {createStore, combineReducers} from 'redux'

import homeReducer from './home/homeReducer'
import loginReducer from './home/loginReducer'
//import reducer here

const rootReducer = combineReducers({
  homeReducer,
  loginReducer
  //add your reducer here
})

const store = createStore(rootReducer)

export default store
