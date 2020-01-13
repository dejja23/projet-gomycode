import axios from 'axios';
import {
  GET_ADS,
  GET_AD,
  DELETE_AD,
  ADD_COMMENT,
  DELETE_COMMENT
} from './actionTypes';

export const getAds = (seller_id, manufacturer, model) => async dispatch => {
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
  model
) => async dispatch => {
  try {
    const category = { manufacturer, model };
    const res = await axios.post('/annonces/', {
      title,
      descerption,
      image,
      price,
      category
    });
    console.log(res);
    dispatch(getAds);
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
  model
) => async dispatch => {
  try {
    const category = { manufacturer, model };
    await axios.put(`/annonces/${id}`, {
      title,
      descerption,
      image,
      price,
      category
    });
    dispatch(getAds);
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
    const res = await axios.post(`/annonces/comment/${id}`, { text });

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id, comment_id) => async dispatch => {
  try {
    await axios.delete(`/annonces/comment/${id}/${comment_id}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: comment_id
    });
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
