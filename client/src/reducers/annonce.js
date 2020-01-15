import {
  GET_ADS,
  GET_AD,
  ADD_AD,
  UPDATE_AD,
  DELETE_AD
} from '../actions/actionTypes';

const initialState = {
  loading: true,
  ads: [],
  ad: null
};

const adReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ADS:
      return {
        ...state,
        ads: payload,
        loading: false
      };
    case GET_AD:
      return {
        ...state,
        ad: payload,
        loading: false
      };
    case ADD_AD:
      return {
        ...state,
        ads: [...state.ads, payload]
      };
    case UPDATE_AD:
      return {
        ...state,
        ads: state.ads.map(ad => (ad._id === payload._id ? payload : ad))
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
