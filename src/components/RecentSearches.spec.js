import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { RecentSearches } from './RecentSearches';

const setup = () => {
  const props = {
    // locations: {},
    // weather: {},
    // geocode: jest.fn(),
    // fetchForecast: jest.fn(),
  }

  const component = <RecentSearches {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<RecentSearches />', () => {
  xit('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
