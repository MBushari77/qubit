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
        <div className="category-video-banner" key={item.id}>
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
                alt="Category"
                className="category-video-element"
              />
            )}
            {item.headline?.length > 2 && (
              <div className="category-video-title">
                <h2>{item.headline}</h2>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryImageVideo;
