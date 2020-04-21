import React, { useState, useEffect } from "react";
import { getCountries } from "../../api/Api";
const CountrySelector = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Global");
  useEffect(() => {
    async function getData() {
      const data = await getCountries();
      setCountries(data);
    }
    getData();
  }, []);

  const onChange = async (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <select name="countries" id="countries" onChange={onChange}>
      <option selected key="global" key="global">
        Global
      </option>
      {countries.map((country) => (
        <option key={country.iso2} value={country.iso2}>
          {country.name}
        </option>
      ))}
    </select>
  );
};
export default CountrySelector;
