/* eslint-disable array-callback-return */

import React from 'react';
import PropTypes from 'prop-types'
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
      return { value: `${v.y} mph`, title: 'wind speed' };
    }
  });
}

const WindSpeedPlot = props => {
  return (
    <XYPlot
      animation
      className="forecast__chart chart__wind"
      height={120}
      width={props.chartWidth}
      onMouseLeave={props.handleMouseLeave}
    >
      <YAxis hideLine left={10} tickFormat={v => `${v} mph`} />
      <HorizontalGridLines />
      <VerticalGridLines tickValues={props.dayDivsions} />
      <LineSeries
        color="grey"
        opacity={0.4}
        data={[
          { x: props.currentTime, y: props.windRange.min },
          { x: props.currentTime, y: props.windRange.max }
        ]}
      />
      <AreaSeries
        data={props.windNightData}
        style={{
          stroke: 'none',
          fill: 'rgba(130, 130, 130, 0.1)'
        }}
      />
      <LineSeries
        color="#1923FA"
        curve="curveMonotoneX"
        data={props.windSpeedData}
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

WindSpeedPlot.propTypes = {
  chartWidth: PropTypes.number.isRequired,
  crosshairValues: PropTypes.array.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  handleNearestX: PropTypes.func.isRequired,
  dayDivsions: PropTypes.array.isRequired,
  titleFormat: PropTypes.func.isRequired,
  currentTime: PropTypes.number.isRequired,
  windSpeedData: PropTypes.array.isRequired,
  windNightData: PropTypes.array.isRequired,
  windRange: PropTypes.object.isRequired,
}

export default WindSpeedPlot;
