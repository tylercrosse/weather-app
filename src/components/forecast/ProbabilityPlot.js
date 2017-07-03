/* eslint-disable array-callback-return */

import React from 'react';
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
        color="blue"
        curve="curveMonotoneX"
        data={props.percipProbData}
        style={{
          fill: 'rgba(31, 89, 217, 0.5)'
        }}
      />
      <LineSeries
        color="green"
        curve="curveMonotoneX"
        data={props.humidityData}
        style={{
          fill: 'none'
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
      <Crosshair
        values={props.crosshairValues}
        titleFormat={props.titleFormat}
        itemsFormat={itemsFormat}
      />
    </XYPlot>
  );
};

export default ProbabilityPlot;
