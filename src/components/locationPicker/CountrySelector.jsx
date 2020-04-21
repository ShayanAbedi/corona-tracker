// import React, { useState, useEffect } from "react";

// const CountrySelector = () => {
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("Global");
//   useEffect(() => {
//     async function getData() {
//       const data = await getCountries();
//       setCountries(data);
//     }
//     getData();
//   }, []);

//   const onChange = async (e) => {
//     setSelectedCountry(e.target.value);
//   };

//   return (
//     <select name="countries" id="countries" onChange={onChange}>
//       <option selected key="global" key="global">
//         Global
//       </option>
//       {countries.map((country) => (
//         <option key={country.iso2} value={country.iso2}>
//           {country.name}
//         </option>
//       ))}
//     </select>
//   );
// };
// export default CountrySelector;
import React, { useEffect, useContext } from "react";
import GlobalContext from "../../context/globalContext";

export const CountrySelector = () => {
  let { countries, getCountries, getStats, selectedCountry } = useContext(
    GlobalContext
  );

  useEffect(() => {
    async function fetchData() {
      await getCountries();
    }
    fetchData();
  }, []);

  const onChange = (e) => {
    getStats(e.target.value);
  };
  return (
    <>
      <select name="countries" id="select-country" onChange={onChange}>
        <option key="Global" value="Global">
          Global
        </option>
        {countries.map((country) => (
          <option key={country.iso2} value={country.iso2}>
            {country.name}
          </option>
        ))}
      </select>
    </>
  );
};
