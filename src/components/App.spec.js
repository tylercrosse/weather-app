import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { App } from './App';

describe('<App />', () => {
  xit('should render correctly', () => {
    const component = <App />;
    const wrapper = shallow(component);
    expect(toJson(wrapper)).toMatchSnapShot();
  });
})
