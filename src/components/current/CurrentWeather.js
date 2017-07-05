import React from "react";
import PropTypes from "prop-types";
import Clouds from "./Clouds";
import RecentSearches from "./RecentSearches";
import Search from "../Search.js";
import "./current.css";

class CurrentWeather extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.showSearch();
  }
  renderBackground() {
    const icon = this.props.weather.currently.icon;
    switch (icon) {
      // case 'clear-day':
      //   return (
      //
      //   )
      // case 'clear-night':
      //   return (
      //
      //   )
      case "cloudy":
        return <Clouds />;
      case "fog":
        return <Clouds />;
      case "partly-cloudy-day":
        return <Clouds />;
      case "partly-cloudy-night":
        return <Clouds />;
      case "rain":
        return <Clouds />;
      case "sleet":
        return <Clouds />;
      case "snow":
        return <Clouds />;
      // case 'wind':
      //   return (
      //
      //   )
      default:
        // FIXME better case for bad response
        return "";
    }
  }
  render() {
    const { weather } = this.props;

    return (
      <div className={"currentWeather " + weather.currently.icon}>
        {this.renderBackground()}
        <div className="currentWeather__info">
          <div className="currentWeather__summary">
            <h1>
              {Math.round(weather.currently.temperature) + "°"}
            </h1>
            <p>
              {weather.currently.summary}
            </p>
          </div>
          <div className="currentWeather__location">
            {this.props.ui.shouldShowSearch
              ? <Search geocode={this.props.geocode} />
              : <button className="location__btn" onClick={this.handleClick}>
                  <h3>
                    {weather.address}
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 47.92 47.92"
                    >
                      <path d="M46.6,40.24,36.05,29.69A19.45,19.45,0,1,0,19.5,39a19.32,19.32,0,0,0,10.19-2.94L40.24,46.6a4.5,4.5,0,1,0,6.36-6.37ZM19.5,33A13.5,13.5,0,1,1,33,19.5,13.5,13.5,0,0,1,19.5,33Z" />
                    </svg>
                </button>}
          </div>
        </div>
      </div>
    );
  }
}

CurrentWeather.propTypes = {
  weather: PropTypes.shape({
    address: PropTypes.string.isRequired,
    currently: PropTypes.shape({
      temperature: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired
    })
  }).isRequired,
  geocode: PropTypes.func.isRequired,
  showSearch: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired
};

export default CurrentWeather;

// {Object.keys(this.props.locations).length !== 0 &&
//   this.props.locations.constructor === Object &&
//   <RecentSearches
//     locations={this.props.locations}
//     fetchForecast={this.props.fetchForecast}
//   />}
