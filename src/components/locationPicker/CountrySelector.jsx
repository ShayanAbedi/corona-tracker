import React, { useEffect, useContext } from "react";
import GlobalContext from "../../context/globalContext";

export const CountrySelector = () => {
  let {
    countries,
    regions,
    selectedCountry,
    getCountries,
    getRegions,
    getStats,
    getRegionStats,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      await getCountries();
    }
    fetchData();
  }, []);

  const onChangeCountry = async (e) => {
    getStats(e.target.value);
    await getRegions(e.target.value);
  };
  const onChangeRegion = async (e) => {
    getRegionStats(e.target.value);
  };
  return (
    <>
      <select name="countries" id="select-country" onChange={onChangeCountry}>
        <option key="Global" value="Global">
          Global
        </option>
        {countries.map((country) => (
          <option key={country.iso2} value={country.iso2}>
            {country.name}
          </option>
        ))}
      </select>
      {selectedCountry !== "GLOBAL" && selectedCountry === "CA" ? (
        <>
          <br></br>
          <select name="states" id="select-state" onChange={onChangeRegion}>
            {regions.map((region) => (
              <option>{region}</option>
            ))}
          </select>
        </>
      ) : null}
    </>
  );
};
