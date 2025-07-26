import React from "react";
import "./AboutGridSection.css";
import image from "./center_image.jpg";

const AboutGridSection = () => {
  return (
    <section className="about-grid-section py-5">
      <div className="about-grid-container">
        <div className="text-center mb-5">
          <h2 className="about-grid-title">
            What Makes Our Visual Solutions Unique
          </h2>
          <p className="about-grid-subtitle">
            We specialize in delivering high-performance display technologies
            built for versatility, precision, and aesthetic impact—no matter the
            environment.
          </p>
        </div>

        <div className="row align-items-center">
          <div className="col-md-4 d-flex flex-column gap-4">
            <div className="about-grid-card">
              <div>
                <i className="bi bi-aspect-ratio about-grid-icon" />
                <h5 className="about-grid-card-title">Custom Shapes & Sizes</h5>
                <p className="about-grid-card-desc">
                  From curved LED walls to circular kiosks, we offer tailor-made
                  display solutions for creative installations.
                </p>
              </div>
            </div>
            <div className="about-grid-card">
              <div>
                <i className="bi bi-easel2 about-grid-icon" />
                <h5 className="about-grid-card-title">Seamless Integration</h5>
                <p className="about-grid-card-desc">
                  Designed to blend effortlessly into any architectural or event
                  setup with minimal disruption.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <img
              src={image}
              alt="Visual solutions illustration"
              className="about-grid-image"
            />
          </div>

          <div className="col-md-4 d-flex flex-column gap-4">
            <div className="about-grid-card">
              <div>
                <i className="bi bi-brightness-high about-grid-icon" />
                <h5 className="about-grid-card-title">
                  High Brightness Displays
                </h5>
                <p className="about-grid-card-desc">
                  Engineered to perform in bright outdoor conditions without
                  compromising on clarity or color.
                </p>
              </div>
            </div>
            <div className="about-grid-card">
              <div>
                <i className="bi bi-shield-check about-grid-icon" />
                <h5 className="about-grid-card-title">Reliable & Durable</h5>
                <p className="about-grid-card-desc">
                  Built for endurance, each unit is tested for heat, weather,
                  and long-hour operation—ideal for permanent or rental use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGridSection;
