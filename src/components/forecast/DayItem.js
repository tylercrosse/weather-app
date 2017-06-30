import React from 'react';
import moment from 'moment';

const DayItem = ({ day }) => {
  const time = moment.unix(day.time).format('ddd D')
  return (
    <div>
      <div>{time}</div>
      <div>
        {Math.round(day.temperatureMax)} / {Math.round(day.temperatureMin)}
      </div>
      <div>
        <img src={`../../${day.icon}.svg`} alt={day.icon} />
      </div>
    </div>
  )
}

export default DayItem
