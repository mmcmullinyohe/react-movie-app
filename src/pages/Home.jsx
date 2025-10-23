import React from 'react'

import ticket from '../assets/ticket.svg'
import './Navbar.css'
import Movie_Posters from '../assets/Movie_Posters.png'
import './Searchbar.css'

const Home = () => {
  return (
    <div>
        <div className="landing">

    <div className="navigation">
    <div className='nav__container'>
        <div className="logo">Movie List</div>
        <div className="ticket__wrapper">
      <img src={ticket} alt="ticket" className='ticket__img'/>
      </div>
    </div>
    <ul className='nav__list'>
    <li className='nav__link'>Home</li>
    <li className='nav__link'>Find Your Movie</li>
    <li className='nav__link'>Contact</li>
    </ul>
    </div>

    <div className="title__container">
        <h1 className='title'>Browse Our Movies</h1>
    </div>
    <div className="search__bar--wrapper">
        <input type='text' className='movie__search-bar' placeholder='Search by Title'></input>
    </div>
    </div>
         <div className='search__results'>
      <div className="results__container">
      <h2>Search Results 
        <span className='searchName' ></span>
      </h2>
      <div className="search__drop--down">
        <select name="movieSort" id="movieSort" >
          <option disabled selected value="">Sort By Year</option>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Home
