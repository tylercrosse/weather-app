/* eslint-disable array-callback-return */

import React from 'react';
import PropTypes from 'prop-types';
import {
  XYPlot,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  AreaSeries,
  LineSeries,
  Crosshair
} from 'react-vis';

/**
 * Format items for Crosshair.
 * @param {Array} values Array of values.
 * @returns {*} Formatted list of items.
 */
function itemsFormat(values) {
  if (values) {
    return [
      { value: `${Math.round(values[0].y * 100)}%`, title: 'cloud cover' },
      { value: `${Math.round(values[1].y * 100)}%`, title: 'chance of rain' },
      { value: `${Math.round(values[2].y * 100)}%`, title: 'humidity' }
    ];
  }
}

const ProbabilityPlot = props => {
  return (
    <XYPlot
      animation
      className="forecast__chart chart__prob"
      yDomain={[0, 1]}
      height={160}
      width={880}
      onMouseLeave={props.handleMouseLeave}
    >
      <YAxis hideLine left={6} tickFormat={v => `${v * 100}%`} />
      <HorizontalGridLines />
      <VerticalGridLines tickValues={props.dayDivsions} />
      <LineSeries
        color="grey"
        opacity={0.4}
        data={[{ x: props.currentTime, y: 0 }, { x: props.currentTime, y: 1 }]}
      />
      <AreaSeries
        data={props.probNightData}
        style={{
          stroke: 'none',
          fill: 'rgba(130, 130, 130, 0.1)'
        }}
      />
      <AreaSeries
        color="rgb(25, 35, 250)"
        curve="curveMonotoneX"
        data={props.percipProbData}
        style={{
          fill: 'rgba(25, 35, 250, 0.5)'
        }}
      />
      <AreaSeries
        color="grey"
        curve="curveMonotoneX"
        data={props.cloudCoverData}
        style={{
          fill: 'rgba(130, 130, 130, 0.2)'
        }}
        onNearestX={props.handleNearestX}
      />
      <LineSeries
        color="#2BEEA3"
        curve="curveMonotoneX"
        data={props.humidityData}
        style={{
          fill: 'none'
        }}
      />
      <Crosshair
        values={props.crosshairValues}
        titleFormat={props.titleFormat}
        itemsFormat={itemsFormat}
      />
    </XYPlot>
  );
};

ProbabilityPlot.propTypes = {
  crosshairValues: PropTypes.array.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  handleNearestX: PropTypes.func.isRequired,
  dayDivsions: PropTypes.array.isRequired,
  titleFormat: PropTypes.func.isRequired,
  currentTime: PropTypes.number.isRequired,
  probNightData: PropTypes.array.isRequired,
  percipProbData: PropTypes.array.isRequired,
  humidityData: PropTypes.array.isRequired,
  cloudCoverData: PropTypes.array.isRequired,
}

export default ProbabilityPlot;
