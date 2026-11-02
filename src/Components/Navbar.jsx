import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          CareerConnect
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/opportunities">Opportunities</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/applications">Applications</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/admin">Admin</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
