import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/icons/logo.png";

const Footer = () => {
  return (
    <footer className="modern-footer pt-5">
      <div className="container footer-content">
        <div className="row g-4 mb-5">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="footer-logo d-block mb-4">
              <img src={logo} alt="qubit-logo" />
            </Link>
            <p className="text-muted mb-4">
              Empowering businesses with innovative digital solutions. We create
              meaningful experiences that drive success.
            </p>
            <ul className="contact-info mb-4 list-unstyled">
              <li>
                <i className="fas fa-map-marker-alt me-2"></i>
                <span>
                  Office 6 , 5258 Anas Ibn Malik Road , Al Malqa District.
                  <br />
                  Riyadh 13521-7479 , Saudi Arabia.
                </span>
              </li>
              <li>
                <i className="fas fa-phone me-2"></i>
                <span>
                  {" "}
                  <a href="tel:+966550017112">
                    <i className="bi bi-telephone" /> +966 55 001 7112
                  </a>
                </span>
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i>
                <span>
                  <a href="mailto:contact@yourbrand.com">
                    <i className="bi bi-envelope" /> contact@yourbrand.com
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="quick-links list-unstyled">
              <li>
                <Link to="#">Our Services</Link>
              </li>
              <li>
                <Link to="#">About Company</Link>
              </li>
              <li>
                <Link to="#">Latest Projects</Link>
              </li>
              <li>
                <Link to="#">Recent News</Link>
              </li>
              <li>
                <Link to="#">Customer Support</Link>
              </li>
              <li>
                <Link to="#">Contact Details</Link>
              </li>
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-12">
            <h3 className="footer-title">Stay Connected</h3>
            <p className="text-muted mb-4">
              Subscribe to our newsletter and stay updated with the latest news
              and insights.
            </p>
            <form className="mb-4">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control newsletter-input"
                  placeholder="Your email address"
                />
              </div>
              <button
                type="submit"
                className="btn btn-subscribe text-white w-100"
              >
                Subscribe Now
              </button>
            </form>
            <div className="social-links d-flex gap-3">
              <a href="#" className="social-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row py-4">
            <div className="col-md-6 text-center text-md-start">
              <p>&copy; 2024 YourBrand. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p>
                Made with <i className="fas fa-heart text-danger"></i> by{" "}
                <Link to="#">YourBrand</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
