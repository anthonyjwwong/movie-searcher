import React from "react";

const Sort = ({ filters, handleSortingChange }) => {
  return (
    <div className="sort-container">
      <select
        name="sortBy"
        id="sort"
        value={filters.sortBy}
        onChange={handleSortingChange}
      >
        <option value="popularity.desc">Popularity ↓</option>
        <option value="popularity.asc">Popularity ↑</option>
        <option value="vote_average.desc">Rating ↓</option>
        <option value="vote_average.asc">Rating ↑</option>
        <option value="primary_release_date.desc">Release Date ↓</option>
        <option value="primary_release_date.asc">Release Date ↑</option>
        <option value="original_title.desc">Title Z-A ↓</option>
        <option value="original_title.asc">Title A-Z ↑</option>
      </select>
    </div>
  );
};

export default Sort;
