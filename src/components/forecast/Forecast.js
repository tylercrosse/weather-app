import React from 'react';
import DayItem from './DayItem';

const Forecast = ({ weather }) => {
  const dayItems = weather.daily.data.map(day => (
    <DayItem day={day} />
  ))

  return (
    <div>
      {dayItems}
    </div>
  )
}

export default Forecast;
