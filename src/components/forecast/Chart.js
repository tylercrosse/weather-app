/* eslint-disable array-callback-return */

import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  AreaSeries,
  LineSeries,
  PolygonSeries,
  Crosshair
} from "react-vis";
import moment from "moment";

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
 * Finds range (min & max values) from an array of formated data.
 * @param  {Array}  arr Array of formated objects with 'x' attributes
 * @return {Object}     Object with min and max attributes
 */
function range(arr) {
  const min = arr.reduce((prev, curr) => (prev.y < curr.y ? prev : curr));
  const max = arr.reduce((prev, curr) => (prev.y > curr.y ? prev : curr));
  return { min: min.y, max: max.y };
}

/**
 * Builds array of time values each 24 hrs apart.
 * @param  {Array} hourlyData Array of 168 objects of hour data
 * @return {Array}            Array of values to use as ticks for gridlines
 */
function buildDayDivisonData(hourlyData) {
  return [
    hourlyData[24].time,
    hourlyData[48].time,
    hourlyData[72].time,
    hourlyData[96].time,
    hourlyData[120].time,
    hourlyData[144].time
  ];
}

function buildNightData(hourlyData, dailyData, range) {
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
    const tempsRange = range(tempsData);
    const probRange = {min: 0, max: 1};
    const windRange = range(windSpeedData);

    const dayDivsions = buildDayDivisonData(hourlyData);

    const tempsNightData = buildNightData(hourlyData, dailyData, tempsRange);
    const probNightData = buildNightData(hourlyData, dailyData, probRange);
    const windNightData = buildNightData(hourlyData, dailyData, windRange);

    return (
      <div>
        <XYPlot
          animation
          className="forecast__chart chart__temps"
          height={200}
          width={880}
          onMouseLeave={this.handleMouseLeave}
        >
          <YAxis
            left={6}
            tickFormat={v => `${v}°F`}
          />
          <HorizontalGridLines />
          <VerticalGridLines tickValues={dayDivsions} />
          <AreaSeries
            data={tempsNightData}
            style={{
              stroke: "none",
              fill: "rgba(130, 130, 130, 0.1)"
            }}
          />
          <LineSeries
            color="grey"
            opacity={0.4}
            data={[
              { x: currentTime, y: tempsRange.min },
              { x: currentTime, y: tempsRange.max }
            ]}
          />
          <LineSeries
            color="red"
            curve="curveMonotoneX"
            data={tempsData}
            style={{
              fill: "none"
            }}
            onNearestX={this.handleNearestX}
          />
          <Crosshair
            values={this.state.crosshairValues}
            titleFormat={titleFormat}
            itemsFormat={itemsFormat}
          />
        </XYPlot>
        <XYPlot
          animation
          className="forecast__chart chart__prob"
          yDomain={[0, 1]}
          height={160}
          width={880}
          onMouseLeave={this.handleMouseLeave}
        >
          <YAxis
            left={6}
            tickFormat={v => `${v * 100}%`}
          />
          <HorizontalGridLines />
          <VerticalGridLines tickValues={dayDivsions} />
          <LineSeries
            color="grey"
            opacity={0.4}
            data={[{ x: currentTime, y: 0 }, { x: currentTime, y: 1 }]}
          />
          <AreaSeries
            data={probNightData}
            style={{
              stroke: "none",
              fill: "rgba(130, 130, 130, 0.1)"
            }}
          />
          <AreaSeries
            color="blue"
            curve="curveMonotoneX"
            data={percipProbData}
            style={{
              fill: "rgba(31, 89, 217, 0.5)"
            }}
            // onNearestX={this.handleNearestX}
          />
          <LineSeries
            color="green"
            curve="curveMonotoneX"
            data={humidityData}
            style={{
              fill: "none"
            }}
            // onNearestX={this.handleNearestX}
          />
          <AreaSeries
            color="grey"
            curve="curveMonotoneX"
            data={cloudCoverData}
            style={{
              fill: "rgba(130, 130, 130, 0.2)"
            }}
            // onNearestX={this.handleNearestX}
          />
          <Crosshair
            values={this.state.crosshairValues}
            titleFormat={titleFormat}
            itemsFormat={itemsFormat}
          />
        </XYPlot>
        <XYPlot
          animation
          className="forecast__chart chart__wind"
          height={120}
          width={880}
          onMouseLeave={this.handleMouseLeave}
        >
          <YAxis
            left={6}
            tickFormat={v => `${v} mph`}
          />
          <HorizontalGridLines />
          <VerticalGridLines tickValues={dayDivsions} />
          <LineSeries
            color="grey"
            opacity={0.4}
            data={[
              { x: currentTime, y: windRange.min },
              { x: currentTime, y: windRange.max }
            ]}
          />
          <AreaSeries
            data={windNightData}
            style={{
              stroke: "none",
              fill: "rgba(130, 130, 130, 0.1)"
            }}
          />
          <LineSeries
            color="blue"
            curve="curveMonotoneX"
            data={windSpeedData}
            style={{
              fill: "none"
            }}
            // onNearestX={this.handleNearestX}
          />
          <Crosshair
            values={this.state.crosshairValues}
            titleFormat={titleFormat}
            itemsFormat={itemsFormat}
          />
        </XYPlot>
      </div>
    );
  }
}

export default Chart;
