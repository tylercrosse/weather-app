import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import Search from './Search';

const setup = () => {
  const props = {
    locations: {
      ChIJVTPokywQkFQRmtVEaUZlJRA: {
        time: 1499098513,
        id: 'ChIJVTPokywQkFQRmtVEaUZlJRA',
        address: 'Seattle, WA, USA',
        lat: 47.6062095,
        lng: -122.3320708
      },
      'ChIJW-T2Wt7Gt4kRKl2I1CJFUsI': {
        time: 1499061460,
        id: 'ChIJW-T2Wt7Gt4kRKl2I1CJFUsI',
        address: 'Washington, DC, USA',
        lat: 38.9071923,
        lng: -77.03687070000001
      },
    },
    fetchForecast: jest.fn(),
    geocode: jest.fn(),
    hideSearch: jest.fn()
  }

  const component = <Search {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<Search />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
