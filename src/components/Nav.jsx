import React from 'react';
import ticket from '../assets/ticket.svg';
import './Navbar.css';

const Nav = () => {
  return (
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
  );
};

export default Nav;
