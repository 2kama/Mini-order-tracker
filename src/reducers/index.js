import { combineReducers } from 'redux'
import auth from './auth_reducers'
import userData from './user_reducers'
import addProductReport from './product_reducers'


const rootReducer = combineReducers({
    auth,
    userData,
    addProductReport
})

export default rootReducer