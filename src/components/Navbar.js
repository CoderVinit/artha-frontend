import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <h2>Artha Job Board</h2>
          </Link>
          
          <div className="navbar-menu">
            <Link to="/jobs" className="nav-link">Browse Jobs</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                {user.role === 'employer' && (
                  <Link to="/post-job" className="nav-link">Post Job</Link>
                )}
                <Link to="/applications" className="nav-link">Applications</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                <button onClick={logout} className="btn btn-secondary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-secondary">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
