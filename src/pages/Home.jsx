import React from 'react'
import { useState, useEffect } from 'react'
import ticket from '../assets/ticket.svg'
import './Navbar.css'
import Movie_Posters from '../assets/Movie_Posters.png'
import './Searchbar.css'


const Home = () => {
const [search, setSearch] = useState("")

  //GRABBING ELEMENTS
const moviesWrapper = document.querySelector(".movies");
const searchName = document.querySelector(".searchName");

//GLOBAL MOVIES VARIABLE
let currentMovies = []

//HANDLING THE SEARCH
function searchChange(event) {
  renderMovies(event.target.value);
 // searchName.innerHTML;
}

//RENDERING MOVIES / CALLING API
async function renderMovies(searchTerm) {
  const response = await fetch(
    `https://www.omdbapi.com/?s=${searchTerm}&apikey=1f242e1c`
  );
  const data = await response.json();
  currentMovies = data.Search
  displayMovies(currentMovies);
}

//DISPLAYING MOVIES
function displayMovies(movieList) {
  moviesWrapper.innerHTML = movieList
    // Use this option to reduce number shown  .slice(0, 9) //
    .map((movie) => {
      return ` 
        <div class="movie">
        <img src=${movie.Poster} class="poster" alt="" />
        <h2>${movie.Title}</h2>
        <h4>${movie.Year}<h4>
        </div>
        `;
    })
    .join("");
}

//SORTING MOVIES
function sortChange(event) {
    const sortOption = event.target.value

    let sortedMovies = [...currentMovies]

    if (sortOption === "newest") {
        sortedMovies.sort((a, b) => b.Year - a.Year)
    }
    else if (sortOption === "oldest") {
        sortedMovies.sort((a, b) => a.Year - b.Year)
    }

    displayMovies(sortedMovies);
}



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
    <li className='nav__link'><a href="#">Home</a></li>
    <li className='nav__link'><a href="#"> Find Your Movie</a></li>
    <li className='nav__link'><a href="mailto:mmcmullinyohe@gmail.com" target="_blank" className="nav__link--contact">
     Contact</a></li>
    </ul>
    </div>

    <div className="title__container">
        <h1 className='title'>Browse Our Movies</h1>
    </div>
    <div className="search__bar--wrapper">
        <input type='text' className='movie__search-bar' placeholder='Search by Title'
        ></input>
    

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
