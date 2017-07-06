import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { App, mapStateToProps } from "./App";

const setup = propOverrides => {
  const props = Object.assign(
    {
      ui: {},
      locations: {},
      weather: { address: 'Seattle, WA'},
      geocode: jest.fn(),
      fetchForecast: jest.fn(),
      showSearch: jest.fn(),
      hideSearch: jest.fn(),
    },
    propOverrides
  );

  const component = <App {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  };
};

describe("<App />", () => {
  it("should render correctly with no conditonals", () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot("no conditionals");
  });

  it("should render correctly with recent searches", () => {
    const { wrapper } = setup({
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
    });
    expect(toJson(wrapper)).toMatchSnapshot("with recent searches");
  });

  it("should render correctly with current weather", () => {
    const { wrapper } = setup({
      weather: {
        address: "Seattle, WA",
        currently: {
          temperature: 73,
          icon: "fog"
        }
      }
    });
    expect(toJson(wrapper)).toMatchSnapshot("with current weather");
  });

  it("should render correctly with forecast", () => {
    const { wrapper } = setup({
      weather: { daily: {} }
    });
    expect(toJson(wrapper)).toMatchSnapshot("with forecast");
  });

  it('should receive the correct props from state', () => {
    const { props } = setup();
    expect(mapStateToProps({...props}))
      .toMatchSnapshot();
  });
});
