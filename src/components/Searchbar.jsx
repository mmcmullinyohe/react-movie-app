import React from 'react'
import './Searchbar.css' 

const Searchbar = () => {
  return (
    <div className='search__results'>
      <div className="results__container">
      <h2>Search Results 
        <span className='searchName' ></span>
      </h2>
      <div className="search__drop--down">
        <select name="movieSort" id="movieSort" onChange="sortChange(event)">
          <option disabled selected value="">Sort By Year</option>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>
      </div>
    </div>
  )
}

export default Searchbar
