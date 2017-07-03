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
  return values.map((v, i) => {
    if (v) {
      return { value: v.y, title: '°F' };
    }
  });
}

const TemperaturePlot = props => {
  return (
    <XYPlot
      animation
      className="forecast__chart chart__temps"
      height={200}
      width={880}
      onMouseLeave={props.handleMouseLeave}
    >
      <YAxis hideLine left={6} tickFormat={v => `${v}°F`} />
      <HorizontalGridLines />
      <VerticalGridLines tickValues={props.dayDivsions} />
      <AreaSeries
        data={props.tempsNightData}
        style={{
          stroke: 'none',
          fill: 'rgba(130, 130, 130, 0.1)'
        }}
      />
      <LineSeries
        color="grey"
        opacity={0.4}
        data={[
          { x: props.currentTime, y: props.tempsRange.min },
          { x: props.currentTime, y: props.tempsRange.max }
        ]}
      />
      <LineSeries
        color="red"
        curve="curveMonotoneX"
        data={props.tempsData}
        style={{
          fill: 'none'
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

export default TemperaturePlot;
