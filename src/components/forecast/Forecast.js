import React from 'react';
import DayItem from './DayItem';

const Forecast = ({ weather }) => {
  const dayItems = weather.daily.data.map(day => (
    <DayItem key={day.time} day={day} />
  ))

  return (
    <div className="forecast" >
      {dayItems}
    </div>
  )
}

export default Forecast;
