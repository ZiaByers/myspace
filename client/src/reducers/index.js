import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import allUsers from './allUsers'

const rootReducer = combineReducers({
  user,
  flash,
  allUsers
})

export default rootReducer
