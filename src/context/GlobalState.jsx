//TODO: make a global variable for url
//TODO: try catch for actions calling the api
import React, { useReducer } from "react";
import axios from "axios";
import GlobalContext from "./globalContext";
import GlobalReducer from "./globalReducer";
import {
  GET_STATS,
  GET_REGION_STATS,
  GET_COUNTRIES,
  GET_LIST_OF_REGIONS,
  GET_DAILY_STATS,
} from "./types";

export const GlobalState = ({ children }) => {
  //Initial State
  const initialState = {
    stats: {},
    regionsStats: [{}],
    dailyStats: [],
    countries: [],
    selectedCountry: "Global",
    regions: [],
  };
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  //Actions
  let url = "https://covid19.mathdro.id/api";

  const getStats = async (selected) => {
    selected !== "Global" && (url = `${url}/countries/${selected}`);
    state.selectedCountry = selected;
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
  };

  const getRegionStats = async (s) => {
    s === "Canada" && getStats(s);
    state.selectedRegion = s;
    let regionsData = state.regionsStats;
    //eslint-disable-next-line
    regionsData.filter((data) => {
      if (data.provinceState === s) {
        let { confirmed, recovered, deaths, lastUpdate } = data;
        lastUpdate = new Date(lastUpdate).toDateString();
        dispatch({
          type: GET_REGION_STATS,
          payload: { confirmed, recovered, deaths, lastUpdate },
        });
      }
    });
  };

  const getCountries = async () => {
    const res = await axios.get(`${url}/countries`);
    dispatch({
      type: GET_COUNTRIES,
      payload: res.data.countries,
    });
  };
  const getListOfRegions = async (s) => {
    const res = await axios.get(
      `https://covid19.mathdro.id/api/countries/${s}/confirmed`
    );
    dispatch({
      type: GET_LIST_OF_REGIONS,
      payload: res.data,
    });
  };

  const getDailyStats = async () => {
    const { data } = await axios.get(`https://covid19.mathdro.id/api/daily`);
    dispatch({
      type: GET_DAILY_STATS,
      payload: data.map(({ confirmed, deaths, reportDate: date }) => ({
        confirmed: confirmed.total,
        deaths: deaths.total,
        date,
      })),
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        stats: state.stats,
        regionsStats: state.regionsStats,
        dailyStats: state.dailyStats,
        countries: state.countries,
        regions: state.regions,
        selectedCountry: state.selectedCountry,
        getStats,
        getRegionStats,
        getCountries,
        getListOfRegions,
        getDailyStats,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
