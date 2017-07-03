import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
// import moment from 'moment';
import Chart from "./Chart";
import weatherJSON from "../../../test/weatherData.json";


const setup = () => {
  const props = {
    ...weatherJSON
  };

  const component = <Chart {...props} />;
  const wrapper = shallow(component);

  return {
    props,
    wrapper
  };
};

describe("<Chart />", () => {
  it("should render correctly", () => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
