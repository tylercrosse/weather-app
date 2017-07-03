import React from 'react';
import PropTypes from 'prop-types';

const CurrentWeather = ({ weather }) =>
  <div className="currentWeather">
    <h3>{weather.address}</h3>
    <h1>{Math.round(weather.currently.temperature)}{'°'}</h1>
    <img
      src={`../${weather.currently.icon}.svg`}
      alt={weather.currently.icon}
    />
  </div>;

CurrentWeather.propTypes = {
  weather: PropTypes.object.isRequired,
}

export default CurrentWeather;
