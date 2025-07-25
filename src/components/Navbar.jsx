import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/icons/logo.png";
import API from "../utils/API";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [Categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get(`/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch Categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="main-nav-navbar">
      <div className="main-nav-container main-nav-header mobile_nav_container">
        <Link to="/" className="main-nav-logo">
          <img src={logo} alt="logo" />
        </Link>
        <button
          className="main-nav-burger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <i className="bi bi-list" style={{ fontSize: "1.5rem" }} />
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="side-nav-overlay" onClick={toggleMenu} />}

      {/* Side Nav */}
      <div className={`side-nav ${menuOpen ? "open" : ""}`}>
        <ul className="side-nav-list">
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/Community" onClick={toggleMenu}>
              Community
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={toggleMenu}>
              Projects
            </Link>
          </li>
          {Categories.map((cat) => (
            <li key={cat.id}>
              <Link to={`/category/${cat.id}`} onClick={toggleMenu}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop nav list */}
      <div className="main-nav-container">
        <ul className="main-nav-list">
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
          <li className="main-nav-item">
            <Link to="/contact" className="main-nav-link">
              Contact Us
            </Link>
          </li>
          <li className="main-nav-item">
            <Link
              to="/Community"
              className="main-nav-link main-nav-link-active"
            >
              Community
            </Link>
          </li>
        </ul>
      </div>

      <hr style={{ margin: "0.2rem", opacity: "0.1" }} />

      <center>
        <ul className="main-nav-list main-nav-list-two">
          <li className="main-nav-item">
            <Link to="/" className="main-nav-logo">
              <img src={logo} alt="logo" />
            </Link>
          </li>
          <li className="main-nav-item">
            <Link to="/projects" className="main-nav-link">
              Projects
            </Link>
          </li>
          {Categories.map((cat) => (
            <li className="main-nav-item" key={cat.id}>
              <Link to={`/category/${cat.id}`} className="main-nav-link">
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </center>
    </nav>
  );
};

export default Navbar;
