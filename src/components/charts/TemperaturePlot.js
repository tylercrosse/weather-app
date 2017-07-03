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
          stroke: "none",
          fill: "rgba(130, 130, 130, 0.1)"
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
          fill: "none"
        }}
        onNearestX={props.handleNearestX}
      />
      <Crosshair
        values={props.crosshairValues}
        titleFormat={props.titleFormat}
        itemsFormat={props.itemsFormat}
      />
    </XYPlot>
  );
};

export default TemperaturePlot;
