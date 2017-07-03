import React from "react";
import DayItem from "./DayItem";
import Chart from "./Chart";

const Forecast = ({ weather }) => {
  const { timezone } = weather;
  const dayItems = weather.daily.data
    .slice(0, 7)
    .map(day => <DayItem key={day.time} day={day} timezone={timezone} />);

  return (
    <div className="forecast">
      <div className="forecast__dayItems">
        {dayItems}
      </div>
      <Chart weather={weather} />
    </div>
  );
};

export default Forecast;
