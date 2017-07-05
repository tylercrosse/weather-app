import React from "react";
import PropTypes from "prop-types";
import Clouds from "./Clouds";
import Search from "./Search";
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
  renderLocation() {
    const { weather } = this.props;
    if (this.props.ui.shouldShowSearch) {
      return (
        <Search
          locations={this.props.locations}
          geocode={this.props.geocode}
          fetchForecast={this.props.fetchForecast}
          hideSearch={this.props.hideSearch}
        />
      );
    }
    return (
      <div className="currentWeather__location">
        <button className="location__btn" onClick={this.handleClick}>
          <h3>
            {weather.address}
          </h3>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.92 47.92">
            <path d="M46.6,40.24,36.05,29.69A19.45,19.45,0,1,0,19.5,39a19.32,19.32,0,0,0,10.19-2.94L40.24,46.6a4.5,4.5,0,1,0,6.36-6.37ZM19.5,33A13.5,13.5,0,1,1,33,19.5,13.5,13.5,0,0,1,19.5,33Z" />
          </svg>
        </button>
      </div>
    );
  }
  render() {
    const { weather } = this.props;

    return (
      <section className="current">
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
            {this.renderLocation()}
          </div>
        </div>
      </section>
    );
  }
}

CurrentWeather.propTypes = {
  locations: PropTypes.object.isRequired,
  weather: PropTypes.shape({
    address: PropTypes.string.isRequired,
    currently: PropTypes.shape({
      temperature: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired
    })
  }).isRequired,
  geocode: PropTypes.func.isRequired,
  fetchForecast: PropTypes.func.isRequired,
  showSearch: PropTypes.func.isRequired,
  hideSearch: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired
};

export default CurrentWeather;
