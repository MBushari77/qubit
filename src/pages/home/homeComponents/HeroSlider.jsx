import React, { useEffect, useState } from "react";
import "./HeroSlider.css";
import DynamicEventCalendar from "./DynamicEventCalendar";
import BaseAPI from "../../../utils/BaseAPI";

const HeroSlider = ({ images = [], interval = 5000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="hero-slider-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`hero-slider-slide ${index === current ? "active" : ""}`}
          style={{
            backgroundImage: `url("${BaseAPI}/uploads/${image.image}")`,
          }}
        >
          <div className="hero-slider-card-body">
            <div>
              {images[current].title.split(".").map((text, id) => (
                <h2 className="hero-slider-card-title" key={id}>
                  {text}
                </h2>
              ))}
              {images[current].info.split(".").map((text, id) => (
                <h2 className="hero-slider-card-text" key={id}>
                  {text}
                </h2>
              ))}
              <button className="hero-slider-card-btn">Learn More</button>
            </div>
          </div>
        </div>
      ))}

      {/* card box on the right */}
      <div className="hero-slider-card">
        <DynamicEventCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <button
        className="hero-slider-btn hero-slider-btn-prev"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="hero-slider-btn hero-slider-btn-next"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default HeroSlider;
