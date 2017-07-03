import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timezone';
import './forecast.css';

const DayTile = ({ day, timezone }) => {
  const time = moment.unix(day.time).tz(timezone).format('ddd D');
  return (
    <div className="dayTile">
      <div>{time}</div>
      <div>
        {Math.round(day.temperatureMax)} / {Math.round(day.temperatureMin)}
      </div>
      <img src={`../../${day.icon}.svg`} alt={day.icon} />
    </div>
  );
};

DayTile.propTypes = {
  day: PropTypes.object.isRequired,
  timezone: PropTypes.string.isRequired,
}

const DayTiles = ({ weather }) => {
  const { timezone } = weather;
  const dayTiles = weather.daily.data
    .slice(0, 7)
    .map(day => <DayTile key={day.time} day={day} timezone={timezone} />);

  return (
    <div className="forecast__dayTiles">
      {dayTiles}
    </div>
  );
};

DayTiles.propTypes = {
  weather: PropTypes.object.isRequired,
}

export default DayTiles;
