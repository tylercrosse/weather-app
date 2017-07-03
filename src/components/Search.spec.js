import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import Search from './Search';

const setup = () => {
  const props = {
    geocode: jest.fn(),
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
