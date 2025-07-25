import React from "react";
import "./logo-slider.css";
import BaseAPI from "../../../utils/BaseAPI";

const LogoSlider = ({ logos }) => {
  return (
    <div className="logo-slider-wrapper">
      <h3 className="logo-slider-heading">Our Partners</h3>

      <div className="logo-slider-track-wrapper">
        <div className="logo-slider-track">
          {[...logos, ...logos].map((item, index) => (
            <div className="logo-slide-card" key={index}>
              <img
                src={`${BaseAPI}/uploads/${item.icon}`}
                alt={item.title}
                className="logo-slide-image"
              />
              {/* <p className="logo-slide-title">{item.title}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
