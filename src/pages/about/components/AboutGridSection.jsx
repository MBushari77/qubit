import React from "react";
import "./AboutGridSection.css";
import image from "./center_image.jpg";

const features = [
  {
    icon: "bi-graph-up",
    title: "Real-time analytics",
    description:
      "Gain actionable insights with our real-time analytics feature",
  },
  {
    icon: "bi-pencil-square",
    title: "Customizable reports",
    description: "Streamline your financial processes with automated workflows",
  },
  {
    icon: "bi-phone",
    title: "Mobile accessibility",
    description:
      "Manage your finances on the go with our mobile-friendly platform",
  },
  {
    icon: "bi-shield-lock",
    title: "Enhanced security",
    description:
      "Protect your sensitive financial data with our state-of-the-art security measures",
  },
];

const AboutGridSection = () => {
  return (
    <section className="about-grid-section py-5">
      <div className="about-grid-container">
        <div className="text-center mb-5">
          <h2 className="about-grid-title">
            Core features that set us apart from the competition
          </h2>
          <p className="about-grid-subtitle">
            Explore our standout features designed to deliver exceptional
            performance and value, distinguishing us from the competition.
          </p>
        </div>

        <div className="row align-items-center">
          <div className="col-md-4 d-flex flex-column gap-4">
            <div className="about-grid-card">
              <div>
                <i className="bi bi-graph-up about-grid-icon" />
                <h5 className="about-grid-card-title">Real-time analytics</h5>
                <p className="about-grid-card-desc">
                  Gain actionable insights with our real-time analytics feature
                </p>
              </div>
            </div>
            <div className="about-grid-card">
              <div>
                <i className="bi bi-pencil-square about-grid-icon" />
                <h5 className="about-grid-card-title">Customizable reports</h5>
                <p className="about-grid-card-desc">
                  Streamline your financial processes with automated workflows
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <img
              src={image}
              alt="Feature illustration"
              className="about-grid-image"
            />
          </div>

          <div className="col-md-4 d-flex flex-column gap-4">
            <div className="about-grid-card">
              <div>
                <i className="bi bi-phone about-grid-icon" />
                <h5 className="about-grid-card-title">Mobile accessibility</h5>
                <p className="about-grid-card-desc">
                  Manage your finances on the go with our mobile-friendly
                  platform
                </p>
              </div>
            </div>
            <div className="about-grid-card">
              <div>
                <i className="bi bi-shield-lock about-grid-icon" />
                <h5 className="about-grid-card-title">Enhanced security</h5>
                <p className="about-grid-card-desc">
                  Protect your sensitive financial data with our
                  state-of-the-art security measures
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
