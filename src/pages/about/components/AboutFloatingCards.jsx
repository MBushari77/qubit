import React from "react";
import "./AboutFloatingCards.css";

const AboutFloatingCards = () => {
  return (
    <div className="abpit_floating_cards_container row">
      <div className="col-lg-4 col-md-4 col-sm-12">
        <div className="card">
          <div>
            <span className="bi bi-tv" />
            <h1>Innovative Displays</h1>
            <p>High-quality LED screens tailored to your needs.</p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-12">
        <div className="card">
          <div>
            <span className="bi bi-transparency" />
            <h1>Custom Shapes</h1>
            <p>Unique, eye-catching designs for any space.</p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-12">
        <div className="card">
          <div>
            <span className="bi bi-lightbulb" />
            <h1>Smart Solutions</h1>
            <p>Advanced electronics for seamless performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFloatingCards;
