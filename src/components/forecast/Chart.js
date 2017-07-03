/* eslint-disable array-callback-return */

import React from "react";
import moment from "moment";
import TemperaturePlot from "../charts/TemperaturePlot";
import ProbabilityPlot from "../charts/ProbabilityPlot";
import WindSpeedPlot from "../charts/WindSpeedPlot";

/**
 * Get the first non-empty item from an array.
 * @param {Array} values Array of values.
 * @returns {*} First non-empty value or undefined.
 */
function getFirstNonEmptyValue(values) {
  return (values || []).find(v => Boolean(v));
}

/**
 * Format title for Crosshair.
 * @param {Array} values List of values.
 * @returns {*} Formatted value or undefined.
 */
function titleFormat(values) {
  const value = getFirstNonEmptyValue(values);

  if (value) {
    return {
      title: "time",
      value: moment.unix(value.x).format("dd h a")
    };
  }
}

/**
 * Format items for Crosshair.
 * @param {Array} values Array of values.
 * @returns {*} Formatted list of items.
 */
function itemsFormat(values) {
  return values.map((v, i) => {
    if (v) {
      return { value: v.y, title: "°F" };
    }
  });
}

/**
 * Select hourly data for a given attribute for use with react-vis
 * @param  {Array}  hourlyData    Array of hourly data.
 * @param  {String} attributeName Name of attribute to use for y value.
 * @return {Array}                Formatted list of items.
 */
function selectDataByAttr(hourlyData, attributeName) {
  return hourlyData.slice(0, 169).map(hour => ({
    x: hour.time,
    y: hour[attributeName]
  }));
}

/**
 * Selects range (min & max values) from an array of formated data.
 * @param  {Array}  arr Array of formated objects with 'x' attributes
 * @return {Object}     Object with min and max attributes
 */
function selectRange(arr) {
  const min = arr.reduce((prev, curr) => (prev.y < curr.y ? prev : curr));
  const max = arr.reduce((prev, curr) => (prev.y > curr.y ? prev : curr));
  return { min: min.y, max: max.y };
}

/**
 * Constructs array of time values each 24 hrs apart by selecting from hourly
 * data.
 * @param  {Array} hourlyData Array of 168+ objects of hour data
 * @return {Array}            Array of values to use as ticks for gridlines
 */
function selectDayDivisonData(hourlyData) {
  return [
    hourlyData[24].time,
    hourlyData[48].time,
    hourlyData[72].time,
    hourlyData[96].time,
    hourlyData[120].time,
    hourlyData[144].time
  ];
}

/**
 * Constructs array of objects for use in night time area plot by selecting
 * values from hourly time data and daily sunrise and sunset data and matching
 * them with a range information.
 * @param  {Array} hourlyData List of 168+ objects of hour data
 * @param  {Array} dailyData  List of 7+ objects of day data
 * @param  {Object} range     Object with min & max attributes
 * @return {Array}            Formated list of data points
 */
function selectNightData(hourlyData, dailyData, range) {
  const leftmostRect = [
    { x: hourlyData[0].time, y: range.min },
    { x: hourlyData[0].time, y: range.max },
    { x: dailyData[0].sunriseTime, y: range.max },
    { x: dailyData[0].sunriseTime, y: range.min },
  ];
  const rightmostRect = [
    { x: dailyData[6].sunsetTime, y: range.min },
    { x: dailyData[6].sunsetTime, y: range.max },
    { x: hourlyData[168].time, y: range.max },
    { x: hourlyData[168].time, y: range.min },
  ];
  const nightData = [leftmostRect, rightmostRect]

  for (let i = 0; i < 6; i++) {
    let rect = [
      { x: dailyData[i].sunsetTime, y: range.min},
      { x: dailyData[i].sunsetTime, y: range.max},
      { x: dailyData[i+1].sunriseTime, y: range.max},
      { x: dailyData[i+1].sunriseTime, y: range.min},
    ];
    nightData.push(rect);
  }

  return nightData.reduce((a, b) => a.concat(b), []);
}

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: []
    };
    this.handleNearestX = this.handleNearestX.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleNearestX(value, { index }) {
    this.setState({
      crosshairValues: [value]
    });
  }
  handleMouseLeave() {
    this.setState({ crosshairValues: [] });
  }
  render() {
    const { hourlyData } = this.props;
    const { dailyData } = this.props;
    const tempsData = selectDataByAttr(hourlyData, "temperature");
    const percipProbData = selectDataByAttr(hourlyData, "precipProbability");
    const humidityData = selectDataByAttr(hourlyData, "humidity");
    const cloudCoverData = selectDataByAttr(hourlyData, "cloudCover");
    const windSpeedData = selectDataByAttr(hourlyData, "windSpeed");

    const currentTime = moment().format("X");
    const tempsRange = selectRange(tempsData);
    const probRange = {min: 0, max: 1};
    const windRange = selectRange(windSpeedData);

    const dayDivsions = selectDayDivisonData(hourlyData);

    const tempsNightData = selectNightData(hourlyData, dailyData, tempsRange);
    const probNightData = selectNightData(hourlyData, dailyData, probRange);
    const windNightData = selectNightData(hourlyData, dailyData, windRange);

    return (
      <div>
        <TemperaturePlot
          handleMouseLeave={this.handleMouseLeave}
          handleNearestX={this.handleNearestX}
          dayDivsions={dayDivsions}
          currentTime={currentTime}
          tempsNightData={tempsNightData}
          tempsRange={tempsRange}
          tempsData={tempsData}
          titleFormat={titleFormat}
          itemsFormat={itemsFormat}
          crosshairValues={this.state.crosshairValues}
        />
        <ProbabilityPlot
          handleMouseLeave={this.handleMouseLeave}
          handleNearestX={this.handleNearestX}
          dayDivsions={dayDivsions}
          currentTime={currentTime}
          probNightData={probNightData}
          percipProbData={percipProbData}
          humidityData={humidityData}
          cloudCoverData={cloudCoverData}
          titleFormat={titleFormat}
          itemsFormat={itemsFormat}
          crosshairValues={this.state.crosshairValues}
        />
        <WindSpeedPlot
          handleMouseLeave={this.handleMouseLeave}
          handleNearestX={this.handleNearestX}
          dayDivsions={dayDivsions}
          currentTime={currentTime}
          windNightData={windNightData}
          windRange={windRange}
          windSpeedData={windSpeedData}
          titleFormat={titleFormat}
          itemsFormat={itemsFormat}
          crosshairValues={this.state.crosshairValues}
        />
      </div>
    );
  }
}

export default Chart;
