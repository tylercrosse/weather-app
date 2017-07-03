import React from "react";
import DayItem from "./DayItem";
import Chart from "./Chart";

const Forecast = ({ weather }) => {
  const dayItems = weather.daily.data
    .slice(0, 7)
    .map(day => <DayItem key={day.time} day={day} />);
  const hourlyData = weather.hourly.data;
  const dailyData = weather.daily.data;

  return (
    <div className="forecast">
      <div className="forecast__dayItems">
        {dayItems}
      </div>
      <Chart hourlyData={hourlyData} dailyData={dailyData} />
    </div>
  );
};

export default Forecast;
