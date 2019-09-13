import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <span className="icon has-text-warning">
        <i className="fas fa-exclamation-triangle"></i>
      </span>
      <div>The Home component is under construction</div>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login"> Log In </Link>
    </div>
  );
};

export default Home;
