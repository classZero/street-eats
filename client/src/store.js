import {createStore} from 'redux'
import tProfileReducer from './truckprofile/reducers/tProfileReducer'


const store = createStore(tProfileReducer)

export default store