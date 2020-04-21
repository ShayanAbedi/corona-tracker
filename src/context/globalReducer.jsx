import { GET_STATS, GET_COUNTRIES } from "./types";
export default (state, action) => {
  switch (action.type) {
    case GET_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    default:
      return state;
  }
};
