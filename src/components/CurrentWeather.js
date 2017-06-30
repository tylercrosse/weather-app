import React from 'react';

const CurrentWeather = ({ weather }) => (
  <div>
    {weather.address}
    <h1>{Math.round(weather.currently.temperature)}{'°'}</h1>
    <img src={`../${weather.currently.icon}.svg`} alt={weather.currently.icon} />
  </div>
);

export default CurrentWeather;
