import React from "react";

class RecentSearches extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showRecent: false
    }
  }
  handleClick = (location) => {
    this.props.fetchForecast(location)
    this.setState({
      showRecent: false
    })
  }
  toggleRecent = () => {
    this.setState({
      showRecent: !this.state.showRecent
    })
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
            {location.address}
          </button>
        );
      });
    return (
      <div className="recentSearches">
        <div>
          <button className="recentSearches__btn" onClick={this.toggleRecent} >
            {this.state.showRecent ? "Hide Recent" : "Show Recent Locations"}
          </button>
        </div>
        {this.state.showRecent && recentSearchItems}
      </div>
    );
  }
}

export default RecentSearches;
