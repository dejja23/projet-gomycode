import axios from 'axios';
import { GET_ADS, ADS_ERROR } from './actionTypes';

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
    dispatch({
      type: ADS_ERROR,
      payload: { msg: error.response.statusText }
    });
  }
};
