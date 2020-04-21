import { GET_STATS } from "./types";
export default (state, action) => {
  switch (action.type) {
    case GET_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    default:
      return state;
  }
};
