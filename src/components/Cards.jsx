import React, { useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import GlobalContext from "../context/globalContext";
export const Cards = () => {
  const { stats, selectedCountry, getStats } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await getStats(selectedCountry);
      setLoading(false);
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  const { confirmed, recovered, deaths, lastUpdate } = stats;

  return (
    <>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <div className="cards">
            <div className="confirmed">
              <span className="cases-title">Infected</span>
              <br />
              <CountUp
                className="cases-number"
                start={0}
                end={confirmed}
                duration={1.5}
                separator=","
              />
            </div>
            <div className="recovered">
              {" "}
              <span className="cases-title">Recovered</span>
              <br />
              <CountUp
                className="cases-number"
                start={0}
                end={recovered}
                duration={1.5}
                separator=","
              />
            </div>
            <div className="deaths">
              {" "}
              <span className="cases-title">Deaths</span>
              <br />
              <CountUp
                className="cases-number"
                start={0}
                end={deaths}
                duration={1.5}
                separator=","
              />
            </div>
          </div>
          <br />
          <small className="last-updated">{`Last Updated: ${lastUpdate}`}</small>{" "}
        </>
      )}
    </>
  );
};
