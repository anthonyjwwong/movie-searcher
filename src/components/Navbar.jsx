import React from "react";
import { useLocation, Link } from "react-router-dom";

const Navbar = ({ favoriteList, isDark, setIsDark }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          MovieFinder
        </Link>

        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            Search
          </Link>
          <Link
            to="/favorites"
            className={`navbar-link ${
              location.pathname === "/favorites" ? "active" : ""
            }`}
          >
            Favorites ({favoriteList.length})
          </Link>

          <button
            className="light-dark-button"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? "light Mode" : "dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
