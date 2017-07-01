import React from 'react';
import moment from 'moment';
import './forecast.css'

const DayItem = ({ day }) => {
  const time = moment.unix(day.time).format('ddd D')
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
