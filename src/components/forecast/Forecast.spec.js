import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Forecast } from './Forecast';

const setup = () => {
  const props = {
    hourlyData: [],
    dailyData: [],
    timezone: 'America/Los_Angeles',
    currentTime: 1499105000
  }

  const component = <Forecast {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<Forecast />', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
