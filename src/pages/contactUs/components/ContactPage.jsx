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

    setSuccessMsg("Thank you for your message!");
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-left-col">
        <img
          className="contact-logo"
          src="https://www.indonesia.travel/content/dam/indtravelrevamp/en/logo.png"
          alt="Logo"
        />
      </div>

      <div className="contact-right-col">
        {/* <div className="contact-theme-switch-wrapper">
          <label className="contact-theme-switch" htmlFor="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              onChange={handleToggleTheme}
              checked={theme === "dark"}
            />
            <div className="contact-slider contact-round"></div>
          </label>
          <div className="contact-toggle-label">Dark Mode</div>
        </div> */}

        <h1 className="contact-heading">Contact us</h1>
        <p className="contact-description">
          Planning to visit Indonesia soon? Get insider tips on where to go,
          things to do and find best deals for your next adventure.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-label" htmlFor="name">
            Full name
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
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button className="contact-button" type="submit">
            Send
          </button>
        </form>

        {error && <div id="contact-error">{error}</div>}
        {successMsg && <div id="contact-success-msg">{successMsg}</div>}
      </div>
    </div>
  );
};

export default ContactPage;
