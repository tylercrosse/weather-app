import React, { Component } from 'react';
import { connect } from 'react-redux';
import { geocode } from '../ducks/locations';
import Search from './Search';
import CurrentWeather from './CurrentWeather'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search geocode={this.props.geocode} />
        {this.props.weather.currently && (
          <CurrentWeather weather={this.props.weather} />
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
  { geocode }
)(App);
