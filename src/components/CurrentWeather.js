import React from 'react';

const CurrentWeather = ({ weather }) => (
  <div>
    {weather.address}
    <h1>{Math.round(weather.currently.temperature)}{'°'}</h1>
  </div>
);

export default CurrentWeather;
