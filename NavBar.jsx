import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ user, onLogout }) {
  return (
    <nav className='navbar'>
      
      <div>
       <button className='nav-button'>{!user && <Link to="/">Home</Link>}</button> 
       {user && <Link to="/reservation">Reservations</Link>}
        {user && user.id === 1 && (
          <>
            <Link to="/admin" >Admin Panel</Link>
            <Link to="/reservations-filter">Dashboard</Link> {/* Updated: Only Reservations Filter */}
          </>
        )}
      </div>
      <div>
        {user ? (
          <button  className='nav-button' onClick={onLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button  className='nav-button'>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
