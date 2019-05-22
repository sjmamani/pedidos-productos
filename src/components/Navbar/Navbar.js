import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{ backgroundColor: "#001932" }}
    >
      <div className="navbar-brand" href="#">
        LOGO
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <div className="nav-link">
              <Link to="/productos">Productos</Link>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <Link to="/pedidos">Pedidos</Link>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <Link to="/clientes">Clientes</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
