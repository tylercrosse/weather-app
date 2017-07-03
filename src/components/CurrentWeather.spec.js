import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { CurrentWeather } from './CurrentWeather';

const setup = () => {
  const props = {
    // locations: {},
    // weather: {},
    // geocode: jest.fn(),
    // fetchForecast: jest.fn(),
  }

  const component = <CurrentWeather {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<CurrentWeather />', () => {
  xit('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
