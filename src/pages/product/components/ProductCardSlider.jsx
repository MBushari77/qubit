import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./cards-slide-style.css";
import { Link } from "react-router-dom";
import BaseAPI from "../../../utils/BaseAPI";

const CardSlider = ({ slides }) => {
  const swiperRef = useRef();

  return (
    <div className="cards-slide-wrapper">
      <h3 className="cards-slide-title-heading">Explore Our Icons</h3>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={true}
        slidesPerView={1.2}
        spaceBetween={20}
        speed={1000}
        modules={[Navigation]}
        className="cards-slide-swiper"
        breakpoints={{
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="cards-slide-card">
              <img
                src={`${BaseAPI}/uploads/${item.icon}`}
                alt={item.title}
                className="cards-slide-image"
              />
              <div className="cards-slide-content">
                <h4 className="cards-slide-title">{item.title}</h4>
                <p className="cards-slide-text">{item.text}</p>
                <Link to={item.link || "#"} className="cards-slide-button">
                  Learn More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="cards-slide-controls">
        <button
          className="cards-slide-arrow bi bi-chevron-left"
          onClick={() => swiperRef.current?.slidePrev()}
        ></button>
        <button
          className="cards-slide-arrow bi bi-chevron-right"
          onClick={() => swiperRef.current?.slideNext()}
        ></button>
      </div>
    </div>
  );
};

export default CardSlider;
