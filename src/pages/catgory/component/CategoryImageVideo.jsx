import React, { useEffect, useState } from "react";
import "./CategoryImageVideo.css";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";

const CategoryImageVideo = ({ categoryId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    API.get(`/sectiontwo/category/${categoryId}`)
      .then((res) => {
        console.log(res.data || []);
        setItems(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load section two data", err);
      });
  }, [categoryId]);

  const isVideo = (filename) =>
    filename?.toLowerCase().match(/\.(mp4|webm|ogg)$/);

  return (
    <div className="category-video-wrapper">
      {items.map((item) => (
        <div className="category-video-card" key={item.id}>
          <h2 className="category-video-title">{item.headline}</h2>
          <div className="category-video-media">
            {isVideo(item.media_file) ? (
              <video
                src={`${BaseAPI}/uploads/${item.media_file}`}
                autoPlay
                muted
                playsInline
                loop
                className="category-video-element"
              />
            ) : (
              <img
                src={`${BaseAPI}/uploads/${item.media_file}`}
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

export default CategoryImageVideo;
