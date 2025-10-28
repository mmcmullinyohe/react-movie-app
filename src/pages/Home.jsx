import React, { useState } from 'react';
import ticket from '../assets/ticket.svg';
import './Navbar.css';
import Movie_Posters from '../assets/Movie_Posters.png';
import './Searchbar.css';

const Home = () => {
  // 🔹 State for search and results
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fetch movies from the OMDb API
  const renderMovies = async (term) => {
    if (!term) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${term}&apikey=1f242e1c`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || 'No results found');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Trigger search when pressing Enter or clicking a button
  const handleSearch = () => renderMovies(searchTerm);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div>
      {/* 🧭 NAVIGATION */}
      <div className="landing">
        <div className="navigation">
          <div className="nav__container">
            <div className="logo">Movie List</div>
            <div className="ticket__wrapper">
              <img src={ticket} alt="ticket" className="ticket__img" />
            </div>
          </div>
          <ul className="nav__list">
            <li className="nav__link"><a href="#">Home</a></li>
            <li className="nav__link"><a href="#">Find Your Movie</a></li>
            <li className="nav__link">
              <a href="mailto:mmcmullinyohe@gmail.com" target="_blank" className="nav__link--contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* 🔎 SEARCH BAR */}
        <div className="title__container">
          <h1 className="title">Browse Our Movies</h1>
        </div>
        <div className="search__bar--wrapper">
          <input
            type="text"
            className="movie__search-bar"
            placeholder="Search by Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="search__btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* 🎬 SEARCH RESULTS SECTION */}
      <div className="search__results">
        <div className="results__container">
          <h2>
            Search Results{' '}
            <span className="searchName">
              {searchTerm ? `"${searchTerm}"` : ''}
            </span>
          </h2>

          <div className="search__drop--down">
            <select name="movieSort" id="movieSort">
              <option disabled selected value="">
                Sort By Year
              </option>
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </div>

        {/* 🔹 Loading / Error / Movie Cards */}
        <div className="movies__grid">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && movies.length > 0 && (
            <div className="movie__list">
              {movies.map((movie) => (
                <div key={movie.imdbID} className="movie__card">
                  <img
                    src={
                      movie.Poster !== 'N/A'
                        ? movie.Poster
                        : 'https://via.placeholder.com/150'
                    }
                    alt={movie.Title}
                    className="movie__poster"
                  />
                  <div className="movie__info">
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && movies.length === 0 && searchTerm && (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
