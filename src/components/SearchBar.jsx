import { Search } from "lucide-react";
const SearchBar = ({ movieQuery, onChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="search for a movie..."
          className="searchbar"
          value={movieQuery}
          onChange={onChange}
          aria-label="Search for movies"
        />
        <button type="submit" className="search-btn">
          <Search />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
