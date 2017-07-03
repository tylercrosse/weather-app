import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import TemperaturePlot from './TemperaturePlot';

const setup = () => {
  const props = {
    crosshairValues: [],
    handleMouseLeave: jest.fn(),
    handleNearestX: jest.fn(),
    dayDivsions: [],
    titleFormat: jest.fn(),
    currentTime: 1499105000,
    tempsData: [],
    tempsNightData: [],
    tempsRange: {},
  }

  const component = <TemperaturePlot {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<TemperaturePlot />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
