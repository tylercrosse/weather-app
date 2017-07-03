import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { TemperaturePlot } from './TemperaturePlot';

const setup = () => {
  const props = {
    // locations: {},
    // weather: {},
    // geocode: jest.fn(),
    // fetchForecast: jest.fn(),
  }

  const component = <TemperaturePlot {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<TemperaturePlot />', () => {
  xit('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
