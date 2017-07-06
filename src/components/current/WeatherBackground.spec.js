import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import WeatherBackground from './WeatherBackground';

const setup = () => {
  const props = {
    classes: ''
  }

  const component = <WeatherBackground {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<WeatherBackground />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
