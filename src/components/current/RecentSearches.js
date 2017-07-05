import React from "react";
import PropTypes from "prop-types";

class RecentSearches extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(location) {
    this.props.fetchForecast(location);
  }
  render() {
    const { locations } = this.props;
    const recentSearchItems = Object.values(locations)
      .sort((a, b) => b.time - a.time)
      .slice(0, 3)
      .map(location => {
        return (
          <button
            key={location.id}
            className="recentSearch__item"
            onClick={() => this.handleClick(location)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path d="M24,0A24,24,0,1,0,48,24,24,24,0,0,0,24,0Zm0,42A18,18,0,1,1,42,24,18,18,0,0,1,24,42Zm9-21H27V15a3,3,0,0,0-6,0v9a3,3,0,0,0,3,3h9a3,3,0,0,0,0-6Z" />
            </svg>
            <p>{location.address}</p>
          </button>
        );
      });
    return (
      <div className="recentSearches">
        {recentSearchItems}
      </div>
    );
  }
}

RecentSearches.propTypes = {
  locations: PropTypes.object.isRequired,
  fetchForecast: PropTypes.func.isRequired
};

export default RecentSearches;
