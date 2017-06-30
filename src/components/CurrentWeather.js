import React from 'react';

const CurrentWeather = ({ weather }) => (
  <div>
    <h1>{Math.round(weather.currently.temperature)}{'°'}</h1>
  </div>
);

export default CurrentWeather;
