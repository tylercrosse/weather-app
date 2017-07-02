import React, { Component } from 'react';
import { connect } from 'react-redux';
import { geocode } from '../ducks/locations';
import { fetchForecast } from '../ducks/weather';
import RecentSearches from './RecentSearches';
import Search from './Search';
import CurrentWeather from './CurrentWeather'
import Forecast from './forecast/Forecast'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {(Object.keys(this.props.locations).length !== 0 && this.props.locations.constructor === Object) && (
          <RecentSearches
            locations={this.props.locations}
            fetchForecast={this.props.fetchForecast}
          />
        )}
        <Search geocode={this.props.geocode} />
        {this.props.weather.currently && (
          <CurrentWeather weather={this.props.weather} />
        )}
        {this.props.weather.daily && (
          <Forecast weather={this.props.weather} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  locations: state.locations,
  weather: state.weather
})

export default connect(
  mapStateToProps,
  { geocode, fetchForecast }
)(App);
