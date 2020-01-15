import axios from 'axios';
import { GET_ADS, GET_AD, ADD_AD, UPDATE_AD, DELETE_AD } from './actionTypes';

export const getAds = (seller_id, manufacturer, model) => async dispatch => {
  console.log(seller_id, manufacturer, model);
  try {
    const res = seller_id
      ? await axios.get(`/annonces?user_id=${seller_id}`)
      : manufacturer
      ? model
        ? await axios.get(
            `/annonces?manufacturer=${manufacturer}&model=${model}`
          )
        : await axios.get(`/annonces?manufacturer=${manufacturer}`)
      : await axios.get(`/annonces/`);

    dispatch({
      type: GET_ADS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAds = () => async dispatch => {
  try {
    const res = await axios.get(`/annonces/recent`);
    dispatch({
      type: GET_ADS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAd = id => async dispatch => {
  try {
    const res = await axios.get(`/annonces/${id}`);
    dispatch({
      type: GET_AD,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
export const addAd = (
  title,
  descerption,
  image,
  price,
  manufacturer,
  model,
  logo
) => async dispatch => {
  try {
    const category = { manufacturer, model, logo };
    const res = await axios.post('/annonces/', {
      title,
      descerption,
      image,
      price,
      category
    });

    dispatch({
      type: ADD_AD,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateAd = (
  id,
  title,
  descerption,
  image,
  price,
  manufacturer,
  model,
  logo
) => async dispatch => {
  try {
    const category = { manufacturer, model, logo };
    const res = await axios.put(`/annonces/${id}`, {
      title,
      descerption,
      image,
      price,
      category
    });
    dispatch({
      type: UPDATE_AD,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAd = id => async dispatch => {
  try {
    await axios.delete(`/annonces/${id}`);
    dispatch({
      type: DELETE_AD,
      payload: id
    });
    dispatch(getAds);
  } catch (error) {
    console.log(error);
  }
};

export const addComment = (id, text) => async dispatch => {
  try {
    await axios.post(`/annonces/comment/${id}`, { text });

    dispatch(getAd(id));
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id, comment_id) => async dispatch => {
  try {
    await axios.delete(`/annonces/comment/${id}/${comment_id}`);

    dispatch(getAd(id));
  } catch (error) {
    console.log(error);
  }
};

export const addLike = id => async dispatch => {
  try {
    await axios.put(`/annonces/like/${id}`);
    dispatch(getAd(id));
  } catch (error) {
    console.log(error);
  }
};

export const removeLike = id => async dispatch => {
  try {
    await axios.put(`/annonces/unlike/${id}`);
    dispatch(getAd(id));
  } catch (error) {
    console.log(error);
  }
};
