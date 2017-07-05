import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import RecentSearches from "./RecentSearches";
import SearchBar from "../SearchBar.js";

class Search extends React.Component {
  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      { capture: true, once: true }
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this.refs.search);

    if (!domNode || !domNode.contains(event.target)) {
      this.props.hideSearch();
    }
  }
  render() {
    return (
      <div ref="search" className="currentWeather__location">
        <SearchBar geocode={this.props.geocode} />
        <RecentSearches
          locations={this.props.locations}
          fetchForecast={this.props.fetchForecast}
        />
      </div>
    );
  }
}

Search.propTypes = {
  locations: PropTypes.object.isRequired,
  geocode: PropTypes.func.isRequired,
  fetchForecast: PropTypes.func.isRequired,
  hideSearch: PropTypes.func.isRequired
};

export default Search;
