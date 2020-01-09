import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from '../actions/actionTypes';

const initialState = {
  loading: true,
  categories: []
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
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload]
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category =>
          category._id === payload._id ? payload : category
        )
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== payload
        ),
        loading: false
      };
    default:
      return state;
  }
};

export default categoryReducer;
