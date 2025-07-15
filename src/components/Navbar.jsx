import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/icons/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="main-nav-navbar">
      <div className="main-nav-container">
        <br />
        {/* <div className="main-nav-header">
          <Link to="/" className="main-nav-logo">
            Qubit
          </Link>
          <button
            className="main-nav-burger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className="bi bi-list" />
          </button>
        </div> */}

        <ul className={`main-nav-list ${menuOpen ? "main-nav-open" : ""}`}>
          <li className="main-nav-item">
            <Link to="/" className="main-nav-logo">
              <img src={logo} alt="" srcset="" />
            </Link>
          </li>
          <li className="main-nav-item">
            <Link to="/" className="main-nav-link">
              Home
            </Link>
          </li>
          <li className="main-nav-item">
            <Link to="/about" className="main-nav-link">
              About
            </Link>
          </li>
          {/* <li className="main-nav-item">
            <Link to="/category" className="main-nav-link">
              Categories
            </Link>
          </li> */}
          <li className="main-nav-item">
            <Link to="/projects" className="main-nav-link">
              Projects
            </Link>
          </li>
          <li className="main-nav-item">
            <Link to="/contact" className="main-nav-link">
              Contact Us
            </Link>
          </li>
          <li className="main-nav-item">
            <Link to="/airpods" className="main-nav-link">
              <button className="nav_button">Portfolio</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
