import React, { useEffect, useState } from "react";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";
import "./projectMeida.css";

const MediaOnProjectPage = ({ media }) => {
  //   const [items, setItems] = useState([]);

  const isVideo = (filename) =>
    filename?.toLowerCase().match(/\.(mp4|webm|ogg)$/);

  return (
    <div className="category-video-wrapper project-category-video-wrapper">
      {media.map((item) => (
        <div className="category-video-card" key={item.id}>
          <h2 className="category-video-title project-video-title">
            {item.title}
          </h2>
          <div className="category-video-media">
            {isVideo(item.icon) ? (
              <video
                src={`${BaseAPI}/uploads/${item.icon}`}
                autoPlay
                muted
                playsInline
                loop
                className="category-video-element"
              />
            ) : (
              <img
                src={`${BaseAPI}/uploads/${item.icon}`}
                alt="Category Media"
                className="category-video-element"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaOnProjectPage;
