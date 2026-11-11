
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Career Connect
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/opportunities">
                Opportunities
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/applications">
                My Applications
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
