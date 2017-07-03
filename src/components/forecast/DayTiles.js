import React from "react";
import moment from 'moment';
import "moment-timezone";
import './forecast.css'

const DayTile = ({ day, timezone }) => {
  const time = moment.unix(day.time).tz(timezone).format('ddd D')
  return (
    <div className="dayTile">
      <div>{time}</div>
      <div>
        {Math.round(day.temperatureMax)} / {Math.round(day.temperatureMin)}
      </div>
      <img src={`../../${day.icon}.svg`} alt={day.icon} />
    </div>
  )
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

export default DayTiles;
