import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { getAllGenres } from "../services/tmdbApi";

const FilterBar = ({ filters, handleChange, handleApplyFilter }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [genres, setGenres] = useState([]);

  const handleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  useEffect(() => {
    try {
      const fetchGenres = async () => {
        const data = await getAllGenres();

        setGenres(data || []);
      };

      fetchGenres();
    } catch (error) {
      console.log("Fail to fetch Genres:", error);
    }
  }, []);

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={handleFilter}>
        <Plus size={13} /> Add Filter
      </button>

      {showFilter && (
        <div className="filter-bar transition">
          <div className="filter-group">
            <label>Genre:</label>
            <select
              name="genreId"
              id="genre"
              value={filters.genreId}
              onChange={handleChange}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <div className="year-range">
              <label>Year:</label>
              <input
                type="number"
                name="yearFrom"
                min="1900"
                max="2100"
                placeholder="From"
                value={filters.yearFrom}
                onChange={handleChange}
              />
              <span>to</span>
              <input
                type="number"
                name="yearTo"
                min="1900"
                max="2100"
                placeholder="To"
                value={filters.yearTo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="rating">Rating</label>
            <select
              name="minRating"
              id="rating"
              value={filters.minRating}
              onChange={handleChange}
            >
              <option value="">Any Rating</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}.0+
                </option>
              ))}
            </select>
          </div>
          <button
            className="apply-filter-button"
            onClick={() => handleApplyFilter(1)}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
