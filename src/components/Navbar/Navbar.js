import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = props => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{backgroundColor: "#001932"}}
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
              <NavLink
                to="/"
                exact
                activeStyle={{ color: "#fff", fontWeight: "bold" }}
              >
                Productos
              </NavLink>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <NavLink
                to="/pedidos"
                exact
                activeStyle={{ color: "#fff", fontWeight: "bold" }}
              >
                Pedidos
              </NavLink>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <NavLink
                to="/clientes"
                exact
                activeStyle={{ color: "#fff", fontWeight: "bold" }}
              >
                Clientes
              </NavLink>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <NavLink
                to="/login"
                exact
                activeStyle={{ color: "#fff", fontWeight: "bold" }}
              >
                Login
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
