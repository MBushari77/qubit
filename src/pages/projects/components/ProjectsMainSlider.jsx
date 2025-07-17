// src/components/ProjectsMainSlider.jsx

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./ProjectsMainSlider.css";
import { Link } from "react-router-dom";

// Example icons from PrimeIcons (you can replace with others if you want)
const iconClasses = [
  "pi pi-lightbulb",
  "pi pi-cog",
  "pi pi-users",
  "pi pi-globe",
  "pi pi-chart-line",
  "pi pi-shield",
  "pi pi-thumbs-up",
  "pi pi-star",
];

const slides = [
  {
    title: "Innovative Solutions",
    subtitle: "Cutting-edge technology to elevate your business.",
    iconClass: iconClasses[0],
    path: "/why-qubit/innovative",
  },
  {
    title: "Custom Projects",
    subtitle: "Tailored visual solutions for every need.",
    iconClass: iconClasses[1],
    path: "/why-qubit/custom-projects",
  },
  {
    title: "Expert Team",
    subtitle: "Experienced professionals ready to assist.",
    iconClass: iconClasses[2],
    path: "/why-qubit/expert-team",
  },
  {
    title: "Global Reach",
    subtitle: "Serving clients locally and internationally.",
    iconClass: iconClasses[3],
    path: "/why-qubit/global-reach",
  },
  {
    title: "Performance Driven",
    subtitle: "Reliable and high-performing products.",
    iconClass: iconClasses[4],
    path: "/why-qubit/performance",
  },
  {
    title: "Secure & Trustworthy",
    subtitle: "Committed to data safety and privacy.",
    iconClass: iconClasses[5],
    path: "/why-qubit/secure",
  },
  {
    title: "Customer Satisfaction",
    subtitle: "Your happiness is our priority.",
    iconClass: iconClasses[6],
    path: "/why-qubit/customer-satisfaction",
  },
  {
    title: "Quality Assurance",
    subtitle: "Rigorous testing for flawless delivery.",
    iconClass: iconClasses[7],
    path: "/why-qubit/quality",
  },
];

const ProjectsMainSlider = ({ slides }) => {
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="why-qubit-container">
      <h3 className="why-qubit-title">
        {/* Why Choose Qubit for Your <br />
        Visual Solutions? */}
      </h3>
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={1.2}
        spaceBetween={20}
        speed={1500}
        modules={[Navigation]}
        className="why-qubit-swiper"
        breakpoints={{
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
      >
        {slides?.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <center>
              <span className="project-main-slider-card-title">
                .0{idx + 1}
              </span>
            </center>
            <div className="why-qubit-card">
              <div className="why-qubit-icon">
                <h2 className={`bi bi-${slide?.icon}`} aria-hidden="true" />
              </div>
              <div className="why-qubit-text">
                <h4 className="why-qubit-title-text">{slide?.title}</h4>
                <p className="why-qubit-subtitle">{slide?.info}</p>
              </div>
              <Link
                to={slide?.link}
                className="group-slider-button-float bi bi-chevron-right"
              ></Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="why-qubit-controls">
        <button
          className="why-qubit-button bi bi-caret-left-fill"
          onClick={() => swiper?.slidePrev()}
          aria-label="Previous"
        />
        <button
          className="why-qubit-button bi bi-caret-right-fill"
          onClick={() => swiper?.slideNext()}
          aria-label="Next"
        />
      </div>
    </div>
  );
};

export default ProjectsMainSlider;
