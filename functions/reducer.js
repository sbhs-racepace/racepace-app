import { combineReducers } from 'redux';
import runReducer from './run_reducer'
import userInfoReducer from './user_info_reducer'

export default combineReducers({
  run:runReducer,
  user:userInfoReducer,
});