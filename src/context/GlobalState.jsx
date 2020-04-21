import React, { useReducer } from "react";
import axios from "axios";
import GlobalContext from "./globalContext";
import GlobalReducer from "./globalReducer";
import { GET_STATS, GET_COUNTRIES } from "./types";

export const GlobalState = ({ children }) => {
  //Initial State
  const initialState = {
    stats: {},
    countries: [],
    selectedCountry: "Global",
  };
  const [state, dispatch] = useReducer(GlobalReducer, initialState);
  const url = "https://covid19.mathdro.id/api";
  //Actions

  const getStats = async (selected) => {
    if (selected === "Global") {
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
    } else {
      state.selectedCountry = selected;
      const res = await axios.get(`${url}/countries/${state.selectedCountry}`);
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
  const getCountries = async () => {
    const res = await axios.get(`${url}/countries`);
    dispatch({
      type: GET_COUNTRIES,
      payload: res.data.countries,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        stats: state.stats,
        countries: state.countries,
        selectedCountry: state.selectedCountry,
        getStats,
        getCountries,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
