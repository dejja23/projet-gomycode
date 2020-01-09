import { GET_USERS, USER_ERROR } from '../actions/actionTypes';

const initialState = {
  loading: true,
  users: [],
  error: {}
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: [...payload],
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};

export default userReducer;
