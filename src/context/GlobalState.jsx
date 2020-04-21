//TODO: make a global variable for url
import React, { useReducer } from "react";
import axios from "axios";
import GlobalContext from "./globalContext";
import GlobalReducer from "./globalReducer";
import {
  GET_STATS,
  GET_REGION_STATS,
  GET_COUNTRIES,
  GET_REGIONS,
} from "./types";

export const GlobalState = ({ children }) => {
  //Initial State
  const initialState = {
    stats: {},
    regionsStats: [{}],
    countries: [],
    selectedCountry: "Global",
    selectedRegion: "",
    regions: [],
  };
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  //Actions
  let url = "https://covid19.mathdro.id/api";

  const getStats = async (selected) => {
    selected !== "Global" &&
      (url = `${url}/countries/${state.selectedCountry}`);
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
    state.selectedRegion = s;
    let regionsData = state.regionsStats;
    regionsData.filter((data) => {
      if (data.provinceState === s) {
        const { confirmed, recovered, deaths } = data;
        dispatch({
          type: GET_REGION_STATS,
          payload: { confirmed, recovered, deaths },
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
  const getRegions = async (s) => {
    const res = await axios.get(
      `https://covid19.mathdro.id/api/countries/${s}/confirmed`
    );
    dispatch({
      type: GET_REGIONS,
      payload: res.data,
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        stats: state.stats,
        regionsStats: state.regionsStats,
        countries: state.countries,
        regions: state.regions,
        selectedCountry: state.selectedCountry,
        selectedRegion: state.selectedRegion,
        getStats,
        getRegionStats,
        getCountries,
        getRegions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
