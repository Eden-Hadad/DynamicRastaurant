import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

function MainPage({ user }) {
  return (
    <div className="main-page">
      <h1>Welcome to Our Restaurant Reservation System</h1>
      <p>Choose an option to continue:</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
      {user && user.id === 1 && (
        <Link to="/admin">
          <button>Admin Panel</button>
        </Link>
      )}
      
    </div>
  );
}

export default MainPage;
