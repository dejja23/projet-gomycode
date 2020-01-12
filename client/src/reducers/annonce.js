import {
  GET_ADS,
  GET_AD,
  DELETE_AD,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_LIKES
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
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter(ad => ad._id !== payload),
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        ad: payload,

        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        ad: { ...state.ad, Comments: payload },
        loading: false
      };
    case DELETE_COMMENT:
      return {
        ...state,
        ad: {
          ...state.ad,
          Comments: state.ad.Comments.filter(comment => comment._id !== payload)
        },
        loading: false
      };
    default:
      return state;
  }
};

export default adReducer;
