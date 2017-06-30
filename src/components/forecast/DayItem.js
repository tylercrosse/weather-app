import React from 'react';
import moment from 'moment';

// clear-day
// clear-night
// partly-cloudy-day
// partly-cloudy-night
// cloudy
// rain
// sleet
// snow
// wind
// fog

const DayItem = ({ day }) => {
  const time = moment.unix(day.time).format('ddd D')
  return (
    <div>
      <div>{time}</div>
      <div>
        {Math.round(day.temperatureMax)} / {Math.round(day.temperatureMin)}
      </div>
      <div>{day.icon}</div>
    </div>
  )
}

export default DayItem
