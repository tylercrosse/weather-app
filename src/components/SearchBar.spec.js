import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import SearchBar from './SearchBar';

const setup = () => {
  const props = {
    geocode: jest.fn(),
  }

  const component = <SearchBar {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<SearchBar />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
