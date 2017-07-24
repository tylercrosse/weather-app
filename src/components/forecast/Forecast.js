import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DayTiles from "./DayTiles";
import Chart from "./Chart";
import "./forecast.css";

export const Forecast = ({ currentTime, timezone, dailyData, hourlyData }) =>
  <section className="forecast">
    <div className="forecast__container">
      <DayTiles timezone={timezone} dailyData={dailyData} />
      <Chart
        currentTime={currentTime}
        timezone={timezone}
        dailyData={dailyData}
        hourlyData={hourlyData}
      />
    </div>
  </section>;

Forecast.propTypes = {
  hourlyData: PropTypes.array.isRequired,
  dailyData: PropTypes.array.isRequired,
  timezone: PropTypes.string.isRequired,
  currentTime: PropTypes.number.isRequired
};

export const mapStateToProps = state => ({
  timezone: state.weather.timezone,
  hourlyData: state.weather.hourly.data,
  dailyData: state.weather.daily.data,
  currentTime: state.weather.currently.time
});

export default connect(mapStateToProps)(Forecast);
