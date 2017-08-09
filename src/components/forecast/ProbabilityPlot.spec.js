import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ProbabilityPlot from './ProbabilityPlot';

const setup = () => {
  const props = {
    chartWidth: 880,
    crosshairValues: [],
    handleMouseLeave: jest.fn(),
    handleNearestX: jest.fn(),
    dayDivsions: [],
    titleFormat: jest.fn(),
    currentTime: 1499105000,
    probNightData: [],
    percipProbData: [],
    humidityData: [],
    cloudCoverData: [],
  }

  const component = <ProbabilityPlot {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<ProbabilityPlot />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
