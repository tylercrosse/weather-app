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
          stroke: "none",
          fill: "rgba(130, 130, 130, 0.1)"
        }}
      />
      <AreaSeries
        color="blue"
        curve="curveMonotoneX"
        data={props.percipProbData}
        style={{
          fill: "rgba(31, 89, 217, 0.5)"
        }}
        // onNearestX={props.handleNearestX}
      />
      <LineSeries
        color="green"
        curve="curveMonotoneX"
        data={props.humidityData}
        style={{
          fill: "none"
        }}
        // onNearestX={props.handleNearestX}
      />
      <AreaSeries
        color="grey"
        curve="curveMonotoneX"
        data={props.cloudCoverData}
        style={{
          fill: "rgba(130, 130, 130, 0.2)"
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

export default ProbabilityPlot;
