import React, { useReducer } from "react";
import axios from "axios";
import GlobalContext from "./globalContext";
import GlobalReducer from "./globalReducer";
import { GET_STATS } from "./types";

export const GlobalState = ({ children }) => {
  //Initial State
  const initialState = {
    stats: {},
  };
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  //Actions
  const getStats = async (location) => {
    const url = "https://covid19.mathdro.id/api";
    if (location === "global") {
      const res = await axios.get(url);
      let { confirmed, recovered, deaths, lastUpdate } = res.data;
      confirmed = confirmed.value;
      recovered = recovered.value;
      deaths = deaths.value;
      lastUpdate = new Date(lastUpdate).toDateString();
      dispatch({
        type: GET_STATS,
        payload: { confirmed, recovered, deaths, lastUpdate },
      });
    }
  };

  return (
    <GlobalContext.Provider value={{ stats: state.stats, getStats }}>
      {children}
    </GlobalContext.Provider>
  );
};
