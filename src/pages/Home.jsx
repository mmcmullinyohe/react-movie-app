
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ticket from '../assets/ticket.svg';
import './Navbar.css';
import './Searchbar.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
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
            <li className="nav__link"><a href="#">Home</a></li>
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
    </div>
  );
};

export default Home;
