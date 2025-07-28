import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/icons/logo.png";

const Footer = () => {
  return (
    <footer className="modern-footer pt-5">
      <div className="container footer-content">
        <div className="row g-4 mb-5">
          {/* Qubit Info */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="footer-logo d-block mb-4">
              <img src={logo} alt="Qubit Logo" />
            </Link>

            <ul className="contact-info mb-4 list-unstyled">
              <li>
                <i className="fas fa-map-marker-alt me-2"></i>
                <span>
                  Qubit International Entertainment Company
                  <br />
                  Building 3071, Office 6, 7479 Anas Ibn Malik Road, Al Malqa
                  District,
                  <br />
                  Riyadh 13525-7479
                </span>
              </li>
              <li>
                <i className="fas fa-phone me-2"></i>
                <a href="tel:+966550017112">
                  <i className="bi bi-telephone" /> +966 55 001 7112
                </a>
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i>
                <a href="mailto:marhaba@qbit.sa">
                  <i className="bi bi-envelope" /> marhaba@qbit.sa
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="quick-links list-unstyled">
              <li>
                <Link to="/services">Our Services</Link>
              </li>
              <li>
                <Link to="/about">About Qubit</Link>
              </li>
              <li>
                <Link to="/projects">Latest Projects</Link>
              </li>
              <li>
                <Link to="/blog">Insights & News</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-12">
            <h3 className="footer-title">Stay Connected</h3>
            <p className="text-muted mb-4">
              Subscribe to Qubit's newsletter for product updates, tech
              insights, and creative inspiration.
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
              <a
                href="https://www.facebook.com/qubituae"
                className="social-icon"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/qubit.ae/"
                className="social-icon"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/qubitelectronics/posts/?feedView=all"
                className="social-icon"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://wa.me/+966550017112"
                className="social-icon"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-whatsapp"></i>
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
              <p>&copy; {Date().slice(11, 15)} Qubit. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p>
                Made with <i className="fas fa-heart text-danger"></i> by{" "}
                <Link to="/">Qubit Team</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
