import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import userReducer from './user';
import adReducer from './annonce';
import categoryReducer from './category';
export default combineReducers({
  alertReducer,
  authReducer,
  userReducer,
  adReducer,
  categoryReducer
});
