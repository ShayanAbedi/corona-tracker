import React from "react";
import Cards from "./components/Cards";
import { CountrySelector } from "./components/locationPicker/CountrySelector";
// import Chart from "./components/chart/Chart";
import { GlobalState } from "./context/GlobalState";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <GlobalState>
        <div className="App">
          <header className="header">
            C<span role="img">🦠</span>VID-19 Tracker
          </header>
          <CountrySelector />
          <Cards />
          <br />
        </div>
      </GlobalState>
    );
  }
}

export default App;
