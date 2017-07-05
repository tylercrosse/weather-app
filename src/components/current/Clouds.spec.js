import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import Clouds from './Clouds';

const setup = () => {
  const props = {
    classes: {}
  }

  const component = <Clouds {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<Clouds />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
