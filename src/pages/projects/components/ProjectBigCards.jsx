import React, { useEffect, useState } from "react";
import "./ProjectBigCards.css";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import { Link } from "react-router-dom";

const ProjectBigCards = ({ slides }) => {
  return (
    <div className="project-two-cards-container project-big-grid-container">
      <div className="row">
        {slides.slice(0, 2).map((slide, index) => (
          <div className="col-12 col-md-6 col-lg-6 mb-4" key={index}>
            <div
              className="product-big-slider-card"
              style={{
                backgroundImage: `url("${BaseAPI}/uploads/${slide.icon}")`,
              }}
            >
              <div className="product-big-slider-card-text">
                <p className="product-big-slider-subtitle">{slide.text}</p>
                <h4 className="product-big-slider-title">{slide.title}</h4>
              </div>
              <Link
                to={slide.link}
                className="group-slider-button-float bi bi-chevron-right"
              ></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectBigCards;
