import React, { Component } from "react";
import { connect } from "react-redux";
import { geocode } from "../ducks/locations";
import { fetchForecast } from "../ducks/weather";
import RecentSearches from "./RecentSearches";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import DayTiles from "./forecast/DayTiles";
import Chart from "./forecast/Chart";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="current">
          {Object.keys(this.props.locations).length !== 0 &&
            this.props.locations.constructor === Object &&
            <RecentSearches
              locations={this.props.locations}
              fetchForecast={this.props.fetchForecast}
            />}
          <Search geocode={this.props.geocode} />
          {this.props.weather.currently &&
            <CurrentWeather weather={this.props.weather} />}
        </section>
        {this.props.weather.daily &&
          <section className="forecast">
            <DayTiles weather={this.props.weather} />
            <Chart weather={this.props.weather} />
          </section>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations,
  weather: state.weather
});

export default connect(mapStateToProps, { geocode, fetchForecast })(App);
