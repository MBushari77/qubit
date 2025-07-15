import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./ProductBigSlider.css";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import { Link } from "react-router-dom";

const ProductBigSlider = ({ slides }) => {
  const swiperRef = useRef();

  return (
    <div className="product-big-slider-container">
      <h3 className="product-big-slider-title-container"></h3>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1.2}
        spaceBetween={20}
        speed={1500}
        modules={[Navigation]}
        className="product-big-slider-swiper"
        breakpoints={{
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
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
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="product-big-slider-controls">
        <button
          className="product-big-slider-button bi bi-caret-left-fill"
          onClick={() => swiperRef.current?.slidePrev()}
        ></button>
        <button
          className="product-big-slider-button bi bi-caret-right-fill"
          onClick={() => swiperRef.current?.slideNext()}
        ></button>
      </div>
    </div>
  );
};

export default ProductBigSlider;
