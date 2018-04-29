<<<<<<< HEAD
import {createStore, combineReducers} from 'redux'

import  homeReducer from './components/home/homeReducer'
//import reducer here

const rootReducer = combineReducers({
  homeReducer,
  //add your reducer here
})

const store = createStore(rootReducer)
=======
import {createStore} from 'redux'
import tProfileReducer from './truckprofile/reducers/tProfileReducer'


const store = createStore(tProfileReducer)

export default store
>>>>>>> 548c8305349d8c8f209d0e8abf9ad7feee8a381d
