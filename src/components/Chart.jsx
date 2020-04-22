import React, { useEffect, useContext } from "react";
import { Line, Bar } from "react-chartjs-2";
import GlobalContext from "../context/globalContext";

export const Chart = () => {
  // const [dailyData, setDailyData] = useState({});
  const { dailyStats, getDailyStats } = useContext(GlobalContext);
  useEffect(() => {
    const fetchApi = async () => {
      await getDailyStats();
    };
    fetchApi();
    //eslint-disable-next-line
  }, []);

  const lineChart = (
    <Line
      width={40}
      height={40}
      data={{
        labels: dailyStats.map(({ date }) => date),
        datasets: [
          {
            data: dailyStats.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyStats.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  );
  return <div className="chart-container">{lineChart}</div>;
};
