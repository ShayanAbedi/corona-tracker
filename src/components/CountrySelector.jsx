import React, { useEffect, useContext } from "react";
import GlobalContext from "../context/globalContext";

export const CountrySelector = () => {
  let {
    countries,
    regions,
    selectedCountry,
    getCountries,
    getListOfRegions,
    getStats,
    getRegionStats,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      await getCountries();
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  const onChangeCountry = async (e) => {
    getStats(e.target.value);
    await getListOfRegions(e.target.value);
  };
  const onChangeRegion = async (e) => {
    getRegionStats(e.target.value);
  };
  return (
    <>
      <select name="countries" id="select-country" onChange={onChangeCountry}>
        <option key="Global" value="Global" defaultValue>
          Global
        </option>
        {countries.map((country) => (
          <option key={country.iso3} value={country.iso2}>
            {country.name}
          </option>
        ))}
      </select>
      {selectedCountry !== "GLOBAL" && selectedCountry === "CA" ? (
        <>
          <select name="states" id="select-state" onChange={onChangeRegion}>
            <option key="Canada" defaultValue>
              Canada
            </option>
            {regions.map((region) => (
              <option key={region}>{region}</option>
            ))}
          </select>
        </>
      ) : null}
    </>
  );
};
