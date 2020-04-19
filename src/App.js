import React from "react";
import Cards from "./components/stats/Cards";
import CountrySelector from "./components/locationPicker/CountrySelector";
import Chart from "./components/chart/Chart";
// import { Cards, CountrySelector, Chart } from "./components";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="header">C🦠VID-19 Tracker</header>
        <Cards />
        <CountrySelector />
        <Chart />
      </div>
    );
  }
}

export default App;
