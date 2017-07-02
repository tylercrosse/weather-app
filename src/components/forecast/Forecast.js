import React from 'react';
import DayItem from './DayItem';
import Chart from './Chart'

const Forecast = ({ weather }) => {
  const dayItems = weather.daily.data.map(day => (
    <DayItem key={day.time} day={day} />
  ))
  const hourlyData = weather.hourly.data;

  return (
    <div className="forecast" >
      <div className="forecast__dayItems">
        {dayItems}
      </div>
      <Chart hourlyData={hourlyData} />
    </div>
  )
}

export default Forecast;
