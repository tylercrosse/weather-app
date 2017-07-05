import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { geocode } from "../ducks/locations";
import { fetchForecast } from "../ducks/weather";
import { showSearch } from "../ducks/ui";
import RecentSearches from "./RecentSearches";
import Search from "./Search";
import CurrentWeather from "./current/CurrentWeather";
import DayTiles from "./forecast/DayTiles";
import Chart from "./forecast/Chart";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="current">
          {this.props.weather.currently
            ? <CurrentWeather
                showSearch={this.props.showSearch}
                ui={this.props.ui}
                weather={this.props.weather}
                geocode={this.props.geocode}
              />
            : <Search geocode={this.props.geocode} />}
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

App.propTypes = {
  locations: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired,
  geocode: PropTypes.func.isRequired,
  fetchForecast: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  ui: state.ui,
  locations: state.locations,
  weather: state.weather
});

export default connect(
  mapStateToProps,
  { geocode, fetchForecast, showSearch }
)(App);
