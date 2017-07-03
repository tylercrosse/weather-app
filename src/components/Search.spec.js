import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Search } from './Search';

const setup = () => {
  const props = {
    // locations: {},
    // weather: {},
    // geocode: jest.fn(),
    // fetchForecast: jest.fn(),
  }

  const component = <Search {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<Search />', () => {
  xit('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
