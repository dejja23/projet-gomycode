import { GET_ADS, DELETE_AD } from '../actions/actionTypes';

const initialState = {
  loading: true,
  ads: []
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
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter(ad => ad._id !== payload),
        loading: false
      };
    default:
      return state;
  }
};

export default adReducer;
