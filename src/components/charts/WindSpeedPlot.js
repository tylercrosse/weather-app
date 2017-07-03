import React from "react";
import {
  XYPlot,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  AreaSeries,
  LineSeries,
  Crosshair
} from "react-vis";

const WindSpeedPlot = props => {
  return (
    <XYPlot
      animation
      className="forecast__chart chart__wind"
      height={120}
      width={880}
      onMouseLeave={props.handleMouseLeave}
    >
      <YAxis hideLine left={6} tickFormat={v => `${v} mph`} />
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
          stroke: "none",
          fill: "rgba(130, 130, 130, 0.1)"
        }}
      />
      <LineSeries
        color="blue"
        curve="curveMonotoneX"
        data={props.windSpeedData}
        style={{
          fill: "none"
        }}
        // onNearestX={props.handleNearestX}
      />
      <Crosshair
        values={props.crosshairValues}
        titleFormat={props.titleFormat}
        itemsFormat={props.itemsFormat}
      />
    </XYPlot>
  );
};

export default WindSpeedPlot;
