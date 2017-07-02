/* eslint-disable array-callback-return */

import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  AreaSeries,
  LineSeries,
  Crosshair
} from "react-vis";
import moment from "moment"

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
      title: 'time',
      value: moment.unix(value.x).format('dd h a')
    }
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
      return {value: v.y, title: '°F'};
    }
  });
}

/**
 * Get hourly data for a given parameter for  use with react-vis
 * @param  {Array} hourlyData Array of hourly data.
 * @param  {String} paramName Name of parameter to use for y value.
 * @return {Array}            Formatted list of items.
 */
function getDataForParam(hourlyData, paramName) {
  return hourlyData.map(hour => ({
    x: hour.time,
    y: hour[paramName]
  }));
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
    })
  }
  handleMouseLeave() {
    this.setState({crosshairValues: []})
  }
  render() {
    const tempData = getDataForParam(this.props.hourlyData, 'temperature');
    const percipProbData = getDataForParam(this.props.hourlyData, 'precipProbability');
    const humidityData = getDataForParam(this.props.hourlyData, 'humidity');
    const cloudCoverData = getDataForParam(this.props.hourlyData, 'cloudCover');
    const windGustData = getDataForParam(this.props.hourlyData, 'windGust');
    const windSpeedData = getDataForParam(this.props.hourlyData, 'windSpeed');

    return (
      <div>
        <XYPlot
          animation
          className="forecast__chart"
          height={200}
          width={900}
          onMouseLeave={this.handleMouseLeave}
          >
            <XAxis
              hideLine
              top={0}
              tickTotal={12}
              tickFormat={v => moment.unix(v).format('dd h a')}
            />
            <YAxis />
            <HorizontalGridLines />
            <LineSeries
              color="red"
              curve="curveMonotoneX"
              data={tempData}
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
          className="forecast__chart"
          height={160}
          width={900}
          onMouseLeave={this.handleMouseLeave}
          >
            <YAxis />
            <HorizontalGridLines />
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
          className="forecast__chart"
          height={120}
          width={900}
          onMouseLeave={this.handleMouseLeave}
          >
            <YAxis />
            <HorizontalGridLines />
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
