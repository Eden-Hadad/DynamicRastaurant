import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function NavBar({ user, onLogout }) {
  return (
    <nav>
      <div>
        {!user && <Link to="/">Home</Link>}
        {user && <Link to="/reservation">Reservations</Link>}
        {user && user.id === 1 && (
          <>
            <Link to="/admin">Admin Panel</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/reservations-filter">Reservations Filter</Link> {/* New Link */}
          </>
        )}
      </div>
      <div>
        {user ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
