import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./NewSlider.css";
import BaseAPI from "../../../utils/BaseAPI";
import { Link } from "react-router-dom";

const NewSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="new-slider-container">
      <button className="new-slider-nav left" onClick={goToPrev}>
        <i className="bi bi-caret-left-fill"></i>
      </button>
      <div className="new-slider-content">
        <div className="new-slider-text">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="new-slider-title">{currentSlide?.title}</h1>
              <p className="new-slider-subtitle">{currentSlide?.info}</p>
              <div className="new-slider-button-container">
                <Link to={currentSlide?.link}>
                  <button className="new-slider-button">Learn more</button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="new-slider-image">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={`${BaseAPI}/uploads/${currentSlide?.image}`}
              alt={currentSlide?.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="new-slider-img"
            />
          </AnimatePresence>
        </div>
      </div>
      <button className="new-slider-nav right" onClick={goToNext}>
        <i className="bi bi-caret-right-fill"></i>
      </button>
    </div>
  );
};

export default NewSlider;
