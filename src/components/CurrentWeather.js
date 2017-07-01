import React from 'react';

const CurrentWeather = ({ weather }) => (
  <div className="currentWeather">
    <h3>{weather.address}</h3>
    <h1>{Math.round(weather.currently.temperature)}{'°'}</h1>
    <img src={`../${weather.currently.icon}.svg`} alt={weather.currently.icon} />
  </div>
);

export default CurrentWeather;
