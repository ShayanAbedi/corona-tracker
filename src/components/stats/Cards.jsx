import React, { useState, useEffect } from "react";
import { callApi } from "../../api/Api";

const Cards = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const response = await callApi();
      setData({
        confirmed: response.confirmed.value,
        recovered: response.recovered.value,
        deaths: response.deaths.value,
      });
    }
    fetchData();
    setLoading(false);
  }, []);

  return (
    <div className="cards">
      {loading ? <h>Loading.....</h> : null}
      <div className="confirmed">{`Confirmed: ${data.confirmed}`}</div>
      <div className="recovered">{`Recovered: ${data.recovered}`}</div>
      <div className="deaths">{`Deaths: ${data.deaths}`}</div>
    </div>
  );
};
export default Cards;
