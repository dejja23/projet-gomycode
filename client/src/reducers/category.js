import { GET_CATEGORIES, CATEGORIES_ERROR } from '../actions/actionTypes';

const initialState = {
  loading: true,
  categories: [],
  error: {}
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...payload],
        loading: false
      };
    case CATEGORIES_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};

export default categoryReducer;
