import React from "react";
import { Cards } from "./components/Cards";
import { CountrySelector } from "./components/CountrySelector";
import { Chart } from "./components/Chart";
import { GlobalState } from "./context/GlobalState";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <GlobalState>
        <div className="App">
          <header className="header">
            C
            <span role="img" aria-label="corona">
              🦠
            </span>
            VID-19 Tracker
          </header>
          <CountrySelector />
          <Cards />
          <Chart />
          <br />
        </div>
      </GlobalState>
    );
  }
}

export default App;
