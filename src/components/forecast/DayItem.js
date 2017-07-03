import React from 'react';
import moment from 'moment';
import "moment-timezone";
import './forecast.css'

const DayItem = ({ day, timezone }) => {
  const time = moment.unix(day.time).tz(timezone).format('ddd D')
  return (
    <div className="dayItem">
      <div>{time}</div>
      <div>
        {Math.round(day.temperatureMax)} / {Math.round(day.temperatureMin)}
      </div>
      <img src={`../../${day.icon}.svg`} alt={day.icon} />
    </div>
  )
}

export default DayItem
