/* eslint-disable array-callback-return */

import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
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
 * Format hourly data for use with react-vis
 * @param  {Array} hourlyData Array of hourly data.
 * @return {Array}            Formatted list of items.
 */
function formatData(hourlyData) {
  return hourlyData.map(hour => ({
    x: hour.time,
    y: hour.temperature
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
    const formatedTemps = formatData(this.props.hourlyData);

    return (
      <XYPlot
        animation
        className="forecast__chart"
        height={200}
        width={900}
        onMouseLeave={this.handleMouseLeave}
      >
        <XAxis tickFormat={v => moment.unix(v).format('dd h a')} />
        <YAxis />
        <HorizontalGridLines />
        <LineSeries
          color="red"
          curve="curveMonotoneX"
          data={formatedTemps}
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
    );
  }
}

export default Chart;
