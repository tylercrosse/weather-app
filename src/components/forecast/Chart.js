import React from "react";
import moment from "moment";
import "moment-timezone";
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
      tempsCrosshairValues: [],
      probCrosshairValues: [],
      windCrosshairValues: []
    };
    this.timezone = this.props.weather.timezone;
    this.hourlyData = this.props.weather.hourly.data;
    this.dailyData = this.props.weather.daily.data;

    this.handleNearestX = this.handleNearestX.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.titleFormat = this.titleFormat.bind(this);
  }
  handleNearestX(value, { index }) {
    const hourData = this.hourlyData[index];
    this.setState({
      tempsCrosshairValues: [
        {x: value.x, y: hourData.temperature }
      ],
      probCrosshairValues: [
        {x: value.x, y: hourData.cloudCover },
        {x: value.x, y: hourData.precipProbability },
        {x: value.x, y: hourData.humidity }
      ],
      windCrosshairValues: [
        {x: value.x, y: hourData.windSpeed }
      ]
    });
  }
  handleMouseLeave() {
    this.setState({
      tempsCrosshairValues: [],
      probCrosshairValues: [],
      windCrosshairValues: []
    });
  }
  /**
   * Format title for Crosshair.
   * @param {Array} values List of values.
   * @returns {*} Formatted value or undefined.
   */
  titleFormat(values) {
    const value = getFirstNonEmptyValue(values);

    if (value) {
      return {
        title: "time",
        value: moment.unix(value.x).tz(this.timezone).format("dd h a")
      };
    }
  }
  render() {
    const { hourlyData, dailyData, timezone} = this;

    const tempsData = selectDataByAttr(hourlyData, "temperature");
    const cloudCoverData = selectDataByAttr(hourlyData, "cloudCover");
    const percipProbData = selectDataByAttr(hourlyData, "precipProbability");
    const humidityData = selectDataByAttr(hourlyData, "humidity");
    const windSpeedData = selectDataByAttr(hourlyData, "windSpeed");

    const currentTime = moment().tz(timezone).format("X");
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
          crosshairValues={this.state.tempsCrosshairValues}
          handleMouseLeave={this.handleMouseLeave}
          handleNearestX={this.handleNearestX}
          titleFormat={this.titleFormat}
          dayDivsions={dayDivsions}
          currentTime={currentTime}
          tempsNightData={tempsNightData}
          tempsRange={tempsRange}
          tempsData={tempsData}
        />
        <ProbabilityPlot
          crosshairValues={this.state.probCrosshairValues}
          handleMouseLeave={this.handleMouseLeave}
          handleNearestX={this.handleNearestX}
          dayDivsions={dayDivsions}
          titleFormat={this.titleFormat}
          currentTime={currentTime}
          probNightData={probNightData}
          percipProbData={percipProbData}
          humidityData={humidityData}
          cloudCoverData={cloudCoverData}
        />
        <WindSpeedPlot
          crosshairValues={this.state.windCrosshairValues}
          handleMouseLeave={this.handleMouseLeave}
          handleNearestX={this.handleNearestX}
          titleFormat={this.titleFormat}
          dayDivsions={dayDivsions}
          currentTime={currentTime}
          windNightData={windNightData}
          windRange={windRange}
          windSpeedData={windSpeedData}
        />
      </div>
    );
  }
}

export default Chart;
