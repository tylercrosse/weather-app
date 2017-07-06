import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CurrentWeather from './CurrentWeather';

const setup = () => {
  const props = {
    weather: {
      address: 'Seattle, WA',
      currently: {
        temperature: 73,
        icon: 'fog',
      },
    },
    locations: {},
    geocode: jest.fn(),
    fetchForecast: jest.fn(),
    showSearch: jest.fn(),
    hideSearch: jest.fn(),
    ui: {}
  }

  const component = <CurrentWeather {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<CurrentWeather />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
