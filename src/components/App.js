import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { geocode } from "../ducks/locations";
import { fetchForecast } from "../ducks/weather";
import { showSearch, hideSearch } from "../ducks/ui";
import SearchBar from "./SearchBar";
import CurrentWeather from "./current/CurrentWeather";
import DayTiles from "./forecast/DayTiles";
import Chart from "./forecast/Chart";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.weather.currently
          ? <CurrentWeather
              showSearch={this.props.showSearch}
              hideSearch={this.props.hideSearch}
              ui={this.props.ui}
              locations={this.props.locations}
              weather={this.props.weather}
              geocode={this.props.geocode}
              fetchForecast={this.props.fetchForecast}
            />
          : <div className="search-no_current">
              <SearchBar geocode={this.props.geocode} />
            </div>}
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

export default connect(mapStateToProps, { geocode, fetchForecast, showSearch, hideSearch })(
  App
);
