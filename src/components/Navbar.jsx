import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/icons/logo.png";
import API from "../utils/API";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Categories
  const [Categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get(`/category`);
        console.log("Categories");
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch Categories:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <nav className="main-nav-navbar">
      <div className="main-nav-container">
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
      <hr style={{ margin: "0.2rem", opacity: "0.1" }} />
      <center>
        <ul className={`main-nav-list ${menuOpen ? "main-nav-open" : ""}`}>
          {Categories.map((cat, id) => (
            <li className="main-nav-item" key={id}>
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
