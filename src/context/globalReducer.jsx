import {
  GET_STATS,
  GET_COUNTRIES,
  GET_LIST_OF_REGIONS,
  GET_REGION_STATS,
  GET_DAILY_STATS,
} from "./types";
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
    case GET_LIST_OF_REGIONS:
      return {
        ...state,
        regions: action.payload.map((region) => region.provinceState),
        regionsStats: action.payload,
      };
    case GET_REGION_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    case GET_DAILY_STATS:
      return {
        ...state,
        dailyStats: action.payload,
      };
    default:
      return state;
  }
};
