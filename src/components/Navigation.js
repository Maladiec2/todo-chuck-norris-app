import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Todo List</Link>
        </li>
        <li>
          <Link to="/jokes">Chuck Norris Jokes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
