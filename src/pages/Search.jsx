
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ticket from '../assets/ticket.svg';
import './Navbar.css';
import './Searchbar.css';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('');

  
  useEffect(() => {
    if (!searchTerm) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${searchTerm}&apikey=1f242e1c`
        );
        const data = await response.json();

        if (data.Response === 'True') {
          const moviesWithNumericYear = data.Search.map((movie) => ({
            ...movie,
            Year: parseInt(movie.Year) || 0,
          }));
          setMovies(moviesWithNumericYear);
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

    fetchMovies();
  }, [searchTerm]);

 
  const handleSearch = () => {
    if (!searchTerm) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

 
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    if (order === 'newest') {
      setMovies((prevMovies) =>
        [...prevMovies].sort((a, b) => b.Year - a.Year)
      );
    } else if (order === 'oldest') {
      setMovies((prevMovies) =>
        [...prevMovies].sort((a, b) => a.Year - b.Year)
      );
    }
  };

  return (
    <div>
   
      <div className="landing">
        <div className="navigation">
          <div className="nav__container">
            <div className="logo">Movie List</div>
            <div className="ticket__wrapper">
              <img src={ticket} alt="ticket" className="ticket__img" />
            </div>
          </div>
          <ul className="nav__list">
            <li className="nav__link"><a href="/">Home</a></li>
            <li className="nav__link"><a href="#">Find Your Movie</a></li>
            <li className="nav__link">
              <a href="mailto:mmcmullinyohe@gmail.com" target="_blank" className="nav__link--contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

      
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

      <div className="search__results">
        <div className="results__container">
          <h2>
            Search Results{' '}
            <span className="searchName">
              {searchTerm ? `"${searchTerm}"` : ''}
            </span>
          </h2>

          <div className="search__drop--down">
            <select
              name="movieSort"
              id="movieSort"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option disabled value="">
                Sort By Year
              </option>
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </div>

        <div className="movies__grid">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && movies.length > 0 && (
            <div className="movie__list">
              {movies.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="movie__card"
                  onClick={() => navigate(`/movie/${movie.imdbID}`)}
                  style={{ cursor: 'pointer' }}
                >
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

export default Search;
