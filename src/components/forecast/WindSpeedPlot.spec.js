import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { WindSpeedPlot } from './WindSpeedPlot';

const setup = () => {
  const props = {
    // locations: {},
    // weather: {},
    // geocode: jest.fn(),
    // fetchForecast: jest.fn(),
  }

  const component = <WindSpeedPlot {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<WindSpeedPlot />', () => {
  xit('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
