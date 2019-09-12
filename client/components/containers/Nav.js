import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar">
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/home">
            Home
          </Link>
          <Link className="navbar-item" to="/profile">
            Profile
          </Link>
          <Link
            className="navbar-item"
            to="/request_match" /* path will eventually depend on match status, this is a placeholder */
          >
            Matches
          </Link>
          <div className="navbar-item">
            <div className="buttons">
              <a
                className="button is-primary" /* button will eventually trigger logout */
              >
                Log Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
