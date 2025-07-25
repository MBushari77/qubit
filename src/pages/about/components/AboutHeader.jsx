import React from "react";
import { ReactTyped } from "react-typed";
import "./AboutHeader.css";

const AboutHeader = () => {
  return (
    <div className="about_header">
      <div className="about_header_content">
        <h1>Crafting Experiences Through Intelligent Display Technology</h1>
        <p>
          <ReactTyped
            strings={[
              "KSA, UAE based experts in display solutions.",
              "Custom solutions for unique installations.",
              "From LEDs to kiosks, built to perform.",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={500}
          />
        </p>
        <div>
          <button className="about_header_secondary">Secondary</button>
          <button className="about_header_primary">Primary</button>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
