import React, { useEffect, useContext } from "react";
import { Line, Bar } from "react-chartjs-2";
import GlobalContext from "../context/globalContext";

export const Chart = () => {
  const { dailyStats, getDailyStats, selectedCountry, stats } = useContext(
    GlobalContext
  );
  useEffect(() => {
    const fetchApi = async () => {
      await getDailyStats();
    };
    fetchApi();
    //eslint-disable-next-line
  }, []);
  const { confirmed, recovered, deaths } = stats;
  const lineChart = (
    <Line
      width={45}
      height={35}
      data={{
        labels: dailyStats.map(({ date }) => date),
        datasets: [
          {
            data: dailyStats.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "rgb(255, 213, 0)",
            fill: true,
          },
          {
            data: dailyStats.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "rgb(227, 61, 53)",
            fill: true,
          },
        ],
      }}
    />
  );
  const barChart =
    selectedCountry !== "Global" ? (
      <Bar
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              label: "People",
              backgroundColor: [
                "rgb(255, 213, 0)",
                "rgb(86, 199, 70)",
                "rgb(227, 61, 53)",
              ],
              data: [confirmed, recovered, deaths],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${selectedCountry}` },
        }}
      />
    ) : null;
  return (
    <div className="chart-container">
      {selectedCountry !== "Global" ? barChart : lineChart}
    </div>
  );
};
