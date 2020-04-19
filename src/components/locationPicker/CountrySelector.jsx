import React, { useState } from "react";
import { getCountries } from "../../api/Api";
const CountrySelector = () => {
  const [countries, setCountries] = useState([{}]);
  const getData = async () => {
    const data = await getCountries();
    // setCountries(data);
    console.log(typeof data);
  };
  getData();

  return (
    <select name="countries" id="countries">
      {/* {countries.map((c) => {
      <h1>{country}</h1>
    })} */}
    </select>
  );
};
export default CountrySelector;
