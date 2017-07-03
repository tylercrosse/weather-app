import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import DayTiles, { DayTile } from './DayTiles';

const setupDayTiles = () => {
  const props = {
    weather: {
      timezone: 'America/Los_Angeles',
      daily: { data: [] }
    },
  }

  const component = <DayTiles {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<DayTiles />', () => {
  it('should render correctly', () => {
    const { wrapper } = setupDayTiles();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})

const setupDayTile = () => {
  const props = {
    day: {
      temperatureMax: 75,
      temperatureMin: 45,
      icon: 'fog',
    },
    timezone: 'America/Los_Angeles'
  }

  const component = <DayTile {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  }
}

describe('<DayTile />', () => {
  it('should render correctly', () => {
    const { wrapper } = setupDayTile();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})
