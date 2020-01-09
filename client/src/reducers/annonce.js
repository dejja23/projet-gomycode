import { GET_ADS, ADS_ERROR } from '../actions/actionTypes';

const initialState = {
  loading: true,
  ads: [],
  error: {}
};

const adReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ADS:
      return {
        ...state,
        ads: [...payload],
        loading: false
      };
    case ADS_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};

export default adReducer;
