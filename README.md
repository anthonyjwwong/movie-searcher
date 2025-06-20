# React Movie Search App

A simple React frontend application to search and browse movies using [TMDB API](https://www.themoviedb.org/documentation/api). The app features client-side routing with React Router and allows users to view movie details and manage favorites.

## Features

- Search movies by title
- View detailed movie information including cast and videos
- Navigate between pages with React Router (`react-router-dom`)
- Save favorite movies (local state or localStorage)

## Tech Stack

- React 18+
- React Router DOM
- Axios for API calls
- TMDB API for movie data

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:

```bash
git clone https://github.com/anthonyjwwong/movie-searcher.git
cd movie-searcher
```

2.Install dependencies:

```bash
npm install
Create a .env file with your TMDB API key:
```

3. Create a .env file with your TMDB api key and get the base URL.

```ini
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

4. Run the app.

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## License

This project is open source and available under the MIT License.
