import React from 'react';

const RecentSearches = ({ locations, fetchForecast }) => {
  const recentSearchItems = Object.values(locations)
    .sort((a, b) => b.time - a.time)
    .slice(0, 3)
    .map(location => {
      console.log(location.time, location.address)
      return (
        <button
          key={location.id}
          className="recentSearch__item"
          onClick={() => fetchForecast(location)}
        >
          {location.address}
        </button>
      )})
  return (
    <div className="recentSearches">
      <div>Recent</div>
      {recentSearchItems}
    </div>
  )
}

export default RecentSearches;
