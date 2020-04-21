import React, { useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import GlobalContext from "../context/globalContext";
const Cards = () => {
  const { stats, selectedCountry, selectedRegion, getStats } = useContext(
    GlobalContext
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await getStats(selectedCountry);
      setLoading(false);
    }
    fetchData();
  }, [selectedCountry, selectedRegion]);

  const { confirmed, recovered, deaths, lastUpdate } = stats;

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div className="cards">
            <div className="confirmed">
              Confirmed:
              <br />
              <CountUp start={0} end={confirmed} duration={1.5} separator="," />
            </div>
            <div className="recovered">
              {" "}
              Recovered:
              <br />
              <CountUp start={0} end={recovered} duration={1.5} separator="," />
            </div>
            <div className="deaths">
              {" "}
              Deaths:
              <br />
              <CountUp start={0} end={deaths} duration={1.5} separator="," />
            </div>
          </div>
          <br />
          <small className="last-updated">{`Last Updated: ${lastUpdate}`}</small>{" "}
        </>
      )}
    </>
  );
};
export default Cards;
