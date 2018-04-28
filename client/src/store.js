import {createStore, combineReducers} from 'redux'

import  homeReducer from './components/home/homeReducer'
//import reducer here

const rootReducer = combineReducers({
  homeReducer,
  //add your reducer here
})

const store = createStore(rootReducer)

export default store
