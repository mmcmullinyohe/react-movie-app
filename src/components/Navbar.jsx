import React from 'react'
import ticket from '../assets/ticket.svg'


const Navbar = () => {
  return (
    <div className='nav__container'>
        <div className="logo">Movie List</div>
        <div className="ticket__wrapper">
      <img src={ticket} alt="ticket"/>
      </div>
    </div>
  )
}

export default Navbar
