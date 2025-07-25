import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./GroupSlider.css";
import API from "../../../utils/API";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BaseAPI from "../../../utils/BaseAPI";

const GroupSlider = () => {
  const swiperRef = useRef();
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await API.get("/homeslider");
        setSlides(res.data.banners || []);
      } catch (error) {
        console.error("Failed to fetch slides:", error);
      }
    };
    fetchSlides();
  }, []);

  return (
    <div className="group-slider-container">
      <h3 className="group-slider-title-container">Explore Our Groups.</h3>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1.2}
        spaceBetween={20}
        speed={1500}
        modules={[Navigation]}
        className="group-slider-swiper"
        breakpoints={{
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="group-slider-card"
              style={{
                backgroundImage: `url("${BaseAPI}/uploads/${slide.image}")`,
              }}
            >
              {/* <img
                src={slide.image}
                alt={slide.title}
                className="group-slider-card-image"
              /> */}
              <div className="group-slider-card-text">
                <p className="group-slider-subtitle">{slide.info}</p>
                <h4 className="group-slider-title">{slide.title}</h4>
              </div>
              <Link
                to={slide.link}
                className="group-slider-button-float bi bi-chevron-right"
              ></Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="group-slider-controls">
        <button
          className="group-slider-button bi bi-caret-left-fill"
          onClick={() => swiperRef.current?.slidePrev()}
        ></button>
        <button
          className="group-slider-button bi bi-caret-right-fill"
          onClick={() => swiperRef.current?.slideNext()}
        ></button>
      </div>
    </div>
  );
};

export default GroupSlider;
