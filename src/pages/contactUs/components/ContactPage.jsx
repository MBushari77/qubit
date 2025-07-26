import React, { useState, useEffect } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [theme, setTheme] = useState("light");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setError("All fields are required.");
      return;
    }

    setSuccessMsg("Thank you for reaching out to Qubit Electronics!");
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-left-col">
        {/* <img
          className="contact-logo"
          src="https://britepixl.com/assets/qubit-logo.png"
          alt="Qubit Electronics Logo"
        /> */}
      </div>

      <div className="contact-right-col">
        {/* Theme switch removed for simplicity */}

        <h1 className="contact-heading">Get in Touch</h1>
        <p className="contact-description">
          Have questions about our LED displays, customized monitors, or visual
          project implementations? We're here to help. Let us know how we can
          support your next idea with Qubit's visual solutions.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-label" htmlFor="name">
            Full Name
          </label>
          <input
            className="contact-input"
            type="text"
            id="name"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="contact-label" htmlFor="email">
            Email Address
          </label>
          <input
            className="contact-input"
            type="email"
            id="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="contact-label" htmlFor="message">
            Message
          </label>
          <textarea
            className="contact-textarea"
            id="message"
            name="message"
            rows="6"
            placeholder="Tell us about your project or inquiry"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button className="contact-button" type="submit">
            Send Message
          </button>
        </form>

        {error && <div id="contact-error">{error}</div>}
        {successMsg && <div id="contact-success-msg">{successMsg}</div>}
      </div>
    </div>
  );
};

export default ContactPage;
