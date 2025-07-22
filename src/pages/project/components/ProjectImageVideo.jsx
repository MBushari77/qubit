import React, { useEffect, useState } from "react";
import "./ProjectImageVideo.css";
import API from "../../../utils/API";
import BaseAPI from "../../../utils/BaseAPI";

const ProjectImageVideo = ({ categoryId }) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    API.get(`/singleproject/${categoryId}`)
      .then((res) => {
        console.log(res.data || {});
        setItems(res.data || {});
      })
      .catch((err) => {
        console.error("Failed to load section two data", err);
      });
  }, [categoryId]);

  const isVideo = (filename) =>
    filename?.toLowerCase().match(/\.(mp4|webm|ogg)$/);

  return (
    <div className="category-video-wrapper">
      <div className="category-video-card">
        <div className="category-video-media">
          {isVideo(items?.icon) ? (
            <video
              src={`${BaseAPI}/uploads/${items?.icon}`}
              autoPlay
              muted
              playsInline
              loop
              className="category-video-element"
            />
          ) : (
            <img
              src={`${BaseAPI}/uploads/${items?.icon}`}
              alt="Category Media"
              className="category-video-element"
            />
          )}
          <br />
          <span className="category-video-subtitle">{items?.subtitle}</span>
          <h2 className="category-video-title">{items?.title}</h2>
          <span className="category-video-info">{items?.text}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectImageVideo;
