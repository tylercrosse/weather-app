import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { ProbabilityPlot } from './ProbabilityPlot';

const setup = () => {
  const props = {
    // locations: {},
    // weather: {},
    // geocode: jest.fn(),
    // fetchForecast: jest.fn(),
  }

  const component = <ProbabilityPlot {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<ProbabilityPlot />', () => {
  xit('should render correctly', () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
