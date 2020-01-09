import axios from 'axios';
import { GET_ADS, DELETE_AD } from './actionTypes';

export const getAds = (manufacturer, model) => async dispatch => {
  try {
    const res = manufacturer
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
