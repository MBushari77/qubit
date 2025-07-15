import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "./BannerSlider.css";
import BaseAPI from "../../../utils/BaseAPI";
import { Link } from "react-router-dom";

const BannerSlider = ({ slides }) => {
  const swiperRef = useRef();

  return (
    <div className="banner-slider-container">
      <h3 className="banner-slider-heading">Explore Our Banners</h3>
      <Swiper
        speed={1000} // ✅ smooth 1-second transition
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={1.2}
        spaceBetween={20}
        modules={[Navigation, Autoplay]}
        className="banner-slider-swiper"
        breakpoints={{
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="banner-slide-card"
              style={{
                backgroundImage: `url("${BaseAPI}/uploads/${slide.icon}")`,
              }}
            >
              <div className="banner-slide-text">
                <p className="banner-slide-subtitle">{slide.text}</p>
                <h4 className="banner-slide-title">{slide.title}</h4>
              </div>
              <Link
                to={slide.link || "#"}
                className="banner-slide-button bi bi-chevron-right"
              ></Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="banner-slider-controls">
        <button
          className="banner-slider-arrow bi bi-caret-left-fill"
          onClick={() => swiperRef.current?.slidePrev()}
        ></button>
        <button
          className="banner-slider-arrow bi bi-caret-right-fill"
          onClick={() => swiperRef.current?.slideNext()}
        ></button>
      </div>
    </div>
  );
};

export default BannerSlider;
