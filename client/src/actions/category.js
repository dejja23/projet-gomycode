import axios from 'axios';
import { GET_CATEGORIES, CATEGORIES_ERROR } from './actionTypes';

export const getCategories = manufacturer => async dispatch => {
  try {
    const res = manufacturer
      ? await axios.get(`/categories?manufacturer=${manufacturer}`)
      : await axios.get(`/categories`);

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: error.response.statusText }
    });
  }
};
