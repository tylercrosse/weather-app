import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { App } from './App';

const setup = () => {
  const props = {
    locations: {},
    weather: {},
    geocode: jest.fn(),
    fetchForecast: jest.fn(),
  }

  const component = <App {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<App />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
