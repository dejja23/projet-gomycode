import axios from 'axios';
import {
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ADD_CATEGORY
} from './actionTypes';

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
    console.log(error);
  }
};

export const addCategory = (manufacturer, logo, model) => async dispatch => {
  try {
    const res = await axios.post('/categories', { manufacturer, logo, model });
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = (
  id,
  manufacturer,
  logo,
  model
) => async dispatch => {
  try {
    const res = await axios.put(`/categories/${id}`, {
      manufacturer,
      logo,
      model
    });

    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = id => async dispatch => {
  try {
    await axios.delete(`/categories/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: id
    });
    dispatch(getCategories);
  } catch (error) {
    console.log(error);
  }
};
