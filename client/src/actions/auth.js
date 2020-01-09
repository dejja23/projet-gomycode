import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../actions/actionTypes';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const register = (
  name,
  email,
  password,
  role,
  phone
) => async dispatch => {
  try {
    const res = await axios.post('/auth/register', {
      name,
      email,
      password,
      role,
      phone
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.msg;
    error && dispatch(setAlert(error, 'danger'));
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const res = await axios.post('/auth/login', { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.msg;
    error && dispatch(setAlert(error, 'danger'));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/auth/current');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
