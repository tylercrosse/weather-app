import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import WindSpeedPlot from './WindSpeedPlot';

const setup = () => {
  const props = {
    chartWidth: 880,
    crosshairValues: [],
    handleMouseLeave: jest.fn(),
    handleNearestX: jest.fn(),
    dayDivsions: [],
    titleFormat: jest.fn(),
    currentTime: 1499105000,
    windSpeedData: [],
    windNightData: [],
    windRange: {},
  }

  const component = <WindSpeedPlot {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<WindSpeedPlot />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
