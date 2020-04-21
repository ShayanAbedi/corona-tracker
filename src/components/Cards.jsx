import React, { useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import GlobalContext from "../context/globalContext";
const Cards = () => {
  const { stats, getStats } = useContext(GlobalContext);
  useEffect(() => {
    getStats("global");
  }, []);
  const { confirmed, recovered, deaths, lastUpdate } = stats;
  return (
    <>
      <div className="cards">
        <div className="confirmed">
          Confirmed:
          <br />
          {confirmed}
          {/* <CountUp start={0} end={confirmed} duration={1.5} separator="," /> */}
        </div>
        <div className="recovered">
          {" "}
          Recovered:
          <br />
          {recovered}
          {/* <CountUp start={0} end={recovered} duration={1.5} separator="," /> */}
        </div>
        <div className="deaths">
          {" "}
          Deaths:
          <br />
          {/* <CountUp start={0} end={deaths} duration={1.5} separator="," /> */}
          {deaths}
        </div>
      </div>
      <br />
      <small className="last-updated">{`Last Updated: ${lastUpdate}`}</small>
    </>
  );
};
export default Cards;
