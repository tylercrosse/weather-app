import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Chart } from './Chart';

const setup = () => {
  const props = {
    // locations: {},
    // weather: {},
    // geocode: jest.fn(),
    // fetchForecast: jest.fn(),
  }

  const component = <Chart {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<Chart />', () => {
  xit('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
